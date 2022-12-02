<template>
    <figure 
    :style='cssVars'
    class="spd overflow-hidden" 
    :class="{
        'position-absolute w-100 h-100 t-0 l-0' : fill,
        'position-relative': !fill
    }"> 

        <div 
        v-if='src || sources' 
        :class='{ "position-absolute w-100 h-100 t-0 l-0": proportion }'>
            <picture>
              <source 
              v-for='(img, index) in sources'
              :key='index'
              :media="`(min-width:${img.width}px)`" 
              :srcset="`${img.src} 1x, ${img.srcx2 || img.src} 2x`">

              <img 
              :loading="computedLoading"
              :class="[innerClasses, classes]"
              class='w-100 h-100 position-absolute t-0 l-0 picture'
              :src='$device && $device.isIE || !sources || !sources.length ? src : null'
              :alt="computedAlt">
            </picture>
        <slot></slot>

        </div>

    </figure>
</template>
<script>
import _get from 'lodash/get'
import _map from 'lodash/map'
import _each from 'lodash/each'
import _first from 'lodash/first'
import _sortBy from 'lodash/sortBy'
import _includes from 'lodash/includes'
import { ProportionsMixin } from 'synchronized-components'
import { getImg } from '@/utils/getimg.js'

export default {
    name: "spd",

    mixins: [ProportionsMixin],

    props: {
        innerClasses: {
            type: String,
            default: ''
        },

        webp: {
            type: Boolean,
            default: false
        },

        contain: {
            type: Boolean,
            default: false
        },

        alt: {
            type: String,
            default: null
        },

        fill: {
            type: Boolean,
            default: false
        },

        loading: {
            type: [String, Boolean],
            default: 'lazy'
        },

        forceOriginalLoading: {
            type: Boolean
        },

        imageSizes: {
            type: [Object],
            required: true
        },

         image: {
            type: Object,
            default: null,
            required: true
        },

        x2ratio: {
          type: Number,
          default: 1.3
        }
    },
    
    computed: {
        computedAlt() {
            return this.alt ? this.alt 
                : this.image ? _get(this.image, 'fields.title')
                : this.$store ? this.$store.getters['app/getState']('siteName')
                : 'Unclassified image'
        },

        sources() {
          let sources = []

          _each(this.imageSizes, (imageProperties, breakpoint) => {
            let srcAttrs = '?'
            let srcx2Attrs = '?'

            _each(imageProperties, (val, prop) => {
              srcAttrs += `${prop}=${val}&`
              let x2val = _includes(['h', 'w'], prop) ? Math.round(val * this.x2ratio) : val
              srcx2Attrs += `${prop}=${x2val}&`
            })

            const src = getImg({
                image: this.image,
                key: null,
                size: srcAttrs,
                webpSupported: this.$webp
            })

            const srcx2 = getImg({
                image: this.image,
                key: null,
                size: srcx2Attrs,
                webpSupported: this.$webp
            })

            sources.push({
              src,
              srcx2,
              'width': breakpoint
            })
          })

          return _sortBy(sources, source => -source.width)
        },

        src() {
            return _first(this.sources).src
        },

        computedLoading() {
            return this.$device && this.$device.isMobileOrTablet ? this.loading : 'eager'
        },

        imageSrcSet() {
            let set = _map(this.sources, (img) => {
                return `${img.src} ${img.width}w`
            })

            return set
        }, 

        classes() {
            return {
                'cover' : !this.contain,
                'contain' : this.contain,
                'bg-center': true
             }
        }
    }
};
</script>

<style lang='scss' scoped>
@import "@/assets/css/mixins";

.spd{
    @include generateProportions();

    .picture{
        object-position: var(--align-mobile);
        @media only screen and (min-width: 768px) {
            object-position: var(--align)
        }
    }
}

</style>