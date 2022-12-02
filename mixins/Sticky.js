import { mapState, mapActions } from 'vuex'
import ResizeHandlerMixin from '@/mixins/ResizeHandler'
import _get from 'lodash/get'

const Sticky = {

  data: () => ({
    topBound: 0,
    stickyElHeight: 0,
    stickyMove: 0,
    wrapperTop: 0
  }),

  mixins: [
    ResizeHandlerMixin
  ],

  computed: {
    ...mapState('app', {
      "appWidth": "width",
      "appHeight": "height"
    }),

    start()  {
      return this.topBound - (this.stickyOffset || 0 )
    },

    end()  {
      return this.start + this.stickyMove
    },

    top()  {
      return this.progress * this.stickyMove 
    },

    stickyStyle()  {
      if (this.$device.isMobileOrTablet || this.appWidth <= 1200){
        return
      }

      return {
        transform: `translate3d(0, ${this.top}px, 0)`
      }
    },

    // total progress
    progress()  {
      if (this.mobileVersion) {
        return 0
      }

      let p = this.scrollProgress(
        this.start,
        this.end,
        this.scrollTop
      )

      return this.reversed ? 1 - p : p
    },
  },

  methods: {
    refBounds(id, defaultEl) {
      let el = this.$refs[id]
      el = (_get(el, '$el') || el) || defaultEl

      return el ? el.getBoundingClientRect() : false
    },

    resizeHandler() {
      this.resizeHandlerSticky()
    },

    // sticky
    resizeHandlerSticky()  {
      setTimeout(() => {
        let outerWrapperBounds = this.refBounds('stickyOuterWrapper', this.$el)
        let wrapperBounds = this.refBounds('stickyWrapper')
        const stickyBounds = this.refBounds('sticky')

        this.wrapperTop = wrapperBounds.top + this.scrollTop

        this.topBound = this.scrollTop + outerWrapperBounds.top
        this.topBound = Math.ceil(this.topBound)
        
        let diff =  Math.max(outerWrapperBounds.top - wrapperBounds.top, 0)

        this.stickyMove = wrapperBounds.height - stickyBounds.height - diff
        this.stickyElHeight = stickyBounds.height

        console.log("move:", this.stickyMove)
        console.log("start end:", this.start, this.end, this.topBound)
      })
    },

    // returning the scroll progress from 0 to 1 in between start/end pixels
    scrollProgress (start, end, scrollOffset)  {
      var scrollOffset = scrollOffset || this.scrollOffset,
          factor = (end - start) / 100,
          scrollStart = (scrollOffset - start) / factor,
          percentage = (scrollOffset >= start && scrollOffset <= end) ? scrollStart / 100 :
              (scrollOffset > start) ? 1 : 0

      return percentage
    }
  }

}

export default Sticky
