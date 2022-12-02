<!-- CONTENTFUL MEDIA COMPONENT -->
<template>
<section class="media-component-full position-relative">
  <!-- IMAGE OR VIDEO OR VIMEO -->
  <proportion-div 
  :class='{
    "h-100": !proportion || fill
  }'
  class='w-100'
  :proportion='!fill ? proportion : null'>

    <component
    class='h-100'
    :alt='alt'
    :image="asset"
    :imageSizes='imageSizes'
    :x2ratio='x2ratio'
    :fill='fill'
    :is='componentType'
    :contain="contain"
    :loop='computedVideoOpts.loop'
    :autoplay='computedVideoOpts.autoplay'
    :forcePoster='computedVideoOpts.forcePoster'
    :muted='computedVideoOpts.muted'
    :playsinline='computedVideoOpts.playsinline'
    :controls='computedVideoOpts.controls'
    :playing.sync='videoPlaying'
    :src='src'
    :preload='preload'
    :posterUrl='computedPosterUrl'  />
  </proportion-div>
  <!-- END :: IMAGE OR VIDEO OR VIMEO -->

</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _size from 'lodash/size'
import _merge from 'lodash/merge'
import _isString from 'lodash/isString'
import _each from 'lodash/each'
import VimeoMixin from '@/mixins/VimeoMixin'

export default {
  name: "media-component-full",

  data: () => ({
     swiperOptions: {
        loop: true,
        effect: 'fade',
        slidesPerView: 1,
        autoplay: {
          delay: 2000
        }
    },
    videoPlaying: false,

    src: null,
    alt: "XWing",
    vimeoPosterUrl: false
  }),

  mixins: [VimeoMixin],

  watch: {
    playing(p) {
      this.videoPlaying = p
    }, 

    videoPlaying(p) {
      this.$emit('update:playing', p)
    }
  },

  async created() {
    if(!this.asset && !this.vimeoId) {
      console.warn("asset or vimeo id required", this._uid)
    }

    this.src = this.vimeoId ? await this.getVideoSrc() : this.originalSrc

    this.$emit('update:isVideo', this.isVideo)
  },

  mounted() {
    if(this.computedVideoOpts.autoplay){
      this.videoPlaying = this.playing
    }
  },

  props: {
    x2ratio: {
      type: Number,
      default: 1.3
    },

    playing: {
      type: Boolean,
      default: true
    },

    contain: {
      type: Boolean,
      default: false
    },

    posterUrl: {
      type: [String, Boolean],
      default: null
    },

    vimeoId: {
      type: [String, Number]
    },

    imageSizes: {
      type: Object,
      default: () => ({
        0: '?w=1920&h=1080&fit=fill'
      })
    },

    preload: {
      type: String,
      default: 'meta'
    },

    proportion: {
      type: [Number, Object, String]
    },

    asset: {
      type: [Object, Boolean],
      default: () => ({})
    },

    fill: Boolean,

    videoOpts: Object
  },

  computed: {
    computedPosterUrl() {
      return this.vimeoPosterUrl || this.posterUrl
    },

    originalSrc() {
      return `https:${_get(this.asset, 'fields.file.url')}`
    },

    computedVideoOpts()  {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          forcePoster: true,
          muted: true,
          playsinline: true,
          controls: false
        }

        var options = _merge({}, defaultOptions, this.videoOpts)
        return options
    },

    isVideo(media){
      return _includes(_get(this.asset, 'fields.file.contentType'), 'video/mp4') || this.vimeoId
    },

    componentType() {
      return this.isVideo ? "html-video" 
            : "pd"
    }
  }

};
</script>