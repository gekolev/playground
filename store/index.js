import storeModules from '@/store/modules'
import dynamicRoutes from '@/routes.json'
import _includes from 'lodash/includes'

// ACTIONS
export const actions = {
  async nuxtServerInit ({ dispatch, commit, state }, { req }) {

    const acceptHeader = req.headers.accept
    dispatch('app/setStateApp', {
      webp: _includes(acceptHeader, 'webp'),
      width: this.$device.isMobile ? 320 : 1920
    })

    dispatch('pages/SET_STATE', {
      urls: dynamicRoutes
    })

    const route = state.route.path
    const locale = this.$contentful.getLocale(route)

    const translations = dispatch('pages/LOAD_TRANSLATIONS_REPEATER', locale)
    const navigation = dispatch('pages/LOAD_NAVIGATION', locale)
    // const footer = dispatch('pages/LOAD_FOOTER', locale)

    return Promise.all([
      translations, 
      navigation,
      // footer
    ]).then((values) => values);
  }
}

// MODULES
export const modules = storeModules