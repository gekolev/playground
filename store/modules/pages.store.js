/* Module: pages */
import stringify from 'json-stringify-safe'

import _get from 'lodash/get'
import _each from 'lodash/each'
import _mapValues from 'lodash/mapValues'
import _mapKeys from 'lodash/mapKeys'

// STATE -----------------------------------------------------------------------

const state = () => ({
  activePage: null,
  translations: {},
  navigation: {},
  footer: {},
  intro: {},
  urls: []
})

// GETTERS ---------------------------------------------------------------------

const getters = {
  getState: state => prop => state[prop],

  getParsedPages: state => state.parsedPages,
  getPages: state => state.pages,

  getUrls: state => state.urls,

  getManyByAttr: state => (type, value, collection = 'urls') =>
    state[collection].filter(page => _get(page, type) === value),

  getByAttr: state => (type, value, collection = 'urls') =>
    state[collection].find(page => _get(page, type) === value)
}

// MUTATIONS -------------------------------------------------------------------

const mutations = {
  SET_STATE: (state, { prop, value }) => {
    state[prop] = value
  }
}

// ACTIONS ---------------------------------------------------------------------

const actions = {
  // @TODO create store helper functions.
  SET_STATE ({ commit }, obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        commit('SET_STATE', { prop: key, value: obj[key] })
      }
    }
  },

  async LOAD_BY_TYPE({ commit, getters, dispatch }, opts) {
    const urls = getters.getState('urls')
    opts.parseOptions.urls = urls

    let entities = await this.$contentful.loadByType(opts.contentful, opts.parseOptions)

    commit('SET_STATE', {
      prop: opts.parseOptions.state,
      value: entities
    })

    return entities
  },

  async LOAD_INTRO ({ commit, getters, dispatch }, locale) {
    return dispatch('LOAD_BY_TYPE', {
      contentful: {        
        content_type: 'intro',
        include: 1,
        limit: 1,
        locale
      },

      parseOptions: {
        parse: true,
        single: true,
        state: 'intro'
      }
    })
  },

  async LOAD_FOOTER ({ commit, getters, dispatch }, locale) {
    return dispatch('LOAD_BY_TYPE', {
      contentful:{
        content_type: 'pageFooter',
        include: 1,
        limit: 1,
        locale
      },

      parseOptions: {
        parse: true,
        single: true,
        state: 'footer'
      }
    })
  },

  async LOAD_NAVIGATION ({ commit, getters, dispatch }, locale) {
    return dispatch('LOAD_BY_TYPE', {
      contentful: {        
        content_type: 'navigation',
        include: 1,
        limit: 1,
        locale
      }, 

      parseOptions: {        
        parse: true,
        single: true,
        state: 'navigation'
      }
    })
  },

  async LOAD_TRANSLATIONS ({ commit, getters, dispatch }, locale) {
    const translations = await this.$contentful.loadByType({
      content_type: 'translation',
      include: 1,
      limit: 1000,
      locale
    })

    if(!translations){
        return
    }

    const tr = _mapValues(
      _mapKeys(translations, item => item.fields.title),
      (t, k) => t.fields.translation
    )

    commit('SET_STATE', {
      prop: 'translations',
      value: tr
    })
  },

  async LOAD_TRANSLATIONS_REPEATER ({ commit, getters, dispatch }, locale) {
    let translations = await this.$contentful.loadByType({
      content_type: 'translation',
      include: 1,
      limit: 1000,
      locale
    })  

    if(!translations){
        return
    }

    let values = {}

    _each(translations, (trans, key) => {

        if(!values[trans.fields.title]){
            values[trans.fields.title] = {}
        }

        _each(trans.fields.translation, (field, key) => {
            values[trans.fields.title][field.key] = field.value
        })
    })

    commit('SET_STATE', {
      prop: 'translations',
      value: values
    })

    return values
  }
}

// =============================================================================

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
