<template>
  <div class='page'>
    <!-- SCROLLING SCELETON -->
    <smooth-scroll 
    class="h-100"
    :isMobile='$device.isMobileOrTablet'
    :scrollTop.sync='scrollTop'
    type='sync'>
    <!-- :scrollTop.sync='scrollTop' -->

      <div class='overflow-hidden position-relative'>

        <!-- COMPONENTS -->
        <slot />
        <!-- END :: COMPONENTS -->

      </div>

    </smooth-scroll>
    <!-- END :: SCROLLING SCELETON -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "scrolling-page",

  data: () => ({
    scrollTop: 0,
  }),

  props: ["pageId", "hideFooter"],
  
  reactiveProvide: {
      name: 'scrollingProps',
      include: ['scrollTop']
  },

  components: {},

  watch: {
    // scrollTop(scrollTop, oldTop) {
    //   let scrollStart = scrollTop > 10
      
    //   this.setStateApp({
    //     scrollStart,
    //     scrollTop,
    //     scrolled: oldTop < scrollTop && scrollStart
    //   })
    // }
  },

  methods: {
    ...mapActions('app', [
      'setStateApp'
    ]),

    // updateScrollTop(scrollTop) {
    //   this.scrollTop = scrollTop
    // }
  },

  beforeDestroy() {
    this.setStateApp({
      scrollStart: false,
      scrolled: false
    })
  }
}
</script>