<template>
    <div class="fullscreen-menu bg-blackv2 color-white position-fixed d-flex flex-center flex-column">
        <!-- <router-link 
          v-for='(item, index) in items' 
          :to='item.url'
          :key='index'
          class="avenuex-font h6 nav-item"
          @click.native="closeMenu(item.url)">
            {{item.title}}
        </router-link> -->
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _get from 'lodash/get'

export default {
  name: "fullscreen-menu",

  data: () => ({}),

  props: ["model"],

  mixins: [],

  watch: {},

  mounted() {},

  methods: {
    ...mapActions('app', [
        'setStateApp'
    ]),

    closeMenu(url) {
      if(!url || (url == this.$route.fullPath)){
        this.setStateApp({
            menuOpen: false
        })
      }
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
.fullscreen-menu {
}
</style>