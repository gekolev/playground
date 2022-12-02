<template>
  <div class="navigation">

    <div class='row'>

      <router-link v-if='item.url'
      :to='item.url'
      :key='index'
      v-for='(item, index) in items'>{{item.fields.title}}</router-link>

    </div>
        
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _get from 'lodash/get'
// import Hamburger from '@/components/Hamburger'

export default {
  name: "navigation",

  data: () => ({}),

  props: [],

  mixins: [],

  watch: {},

  mounted() {
  },

  methods: {
    ...mapActions('app', [
        'setStateApp'
    ]),

    toggleMenu(state) {
        let menuOpen = state === false ? false : !this.menuOpen
        this.setStateApp(menuOpen)
        return menuOpen
    }
  },

  computed: {
    ...mapState('pages', [
      'navigation'
    ]),

    ...mapState('app', [
      'menuOpen'
    ]),

    items() {
      return _get(this.navigation, 'fields.pages')
    }
  },

  components: {}
};
</script>

<style lang="scss" scoped="">
.navigation {}
</style>