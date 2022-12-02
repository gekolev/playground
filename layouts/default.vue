<template>
    <div :style='cssColors'>
        <navigation />
        <custom-transition
        :mode='"out-in"'
        :delay='.15'
        :pageTransition='true'>
            <nuxt :key="pageKey" />
        </custom-transition>
    </div>
</template>

<script>
import Vue from 'vue';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _each from 'lodash/each';

import { gsap } from 'gsap'

import Navigation from '@/components/Navigation';

import DeviceDetection from '@/mixins/DeviceDetection';
import Theme from '@/mixins/Theme';
import Signature from '@/mixins/Signature';

import { FONT_SIZES, DESIGN_BREAKPOINTS, GRID_BREAKPOINTS } from '@/config/constants'

import FontSizesMixin from '@/mixins/FontSizes'
import Colors from '@/assets/configs/colors'

import { mapState, mapActions } from 'vuex'

export default {

    components: {
        Navigation
    },

    mixins: [
        DeviceDetection,
        Theme,
        Signature,
        FontSizesMixin
    ],

    data: () => ({}),

    head()  {
        if (!this.activePage || !this.activePage.seo) {
            return {
                //should return default meta
            }
        }

        let meta =  _map(this.activePage.seo, (value, index) => {
            let obj = {
                hid: index,
                content: value.value
            }

            obj[value.attribute] = index

            return obj
        })

        return {
            title: _get(this.activePage, 'seo.title.value'),
            meta: meta
        }
    },

    computed: {
        ...mapState('pages', [
          'activePage',
        ]),

        cssColors() {
            let colors = {}
            _each(this.$siteColors, (color, key) => {
                colors[`--${key}`] = color
            })

            return colors
        },

        breakpoints() {
          let breakpoints = _mapKeys(this.$GRID_BREAKPOINTS, (val, key) => {
            return `--${key}-breakpoint`
          })

          breakpoints = _mapValues(breakpoints, (val, key) => {
            return `${val}px`
          })

          return this.makeStyle(breakpoints)
        },

        pageKey()  {
            return _get(this.activePage, 'sys.id') || 'not-found'
        }
    },

    created()  {
        Vue.prototype.$FONT_SIZES = FONT_SIZES
        Vue.prototype.$siteColors = Colors
        Vue.prototype.$DESIGN_BREAKPOINTS = DESIGN_BREAKPOINTS
        Vue.prototype.$GRID_BREAKPOINTS = GRID_BREAKPOINTS 
        Vue.prototype.$webp = this.$store.getters['app/getState']('webp')
    },
    async mounted() {
        
        // FORCE HIGH PERFROMANCE
        let el = document.createElement('canvas')
        gsap.ticker.add(() => {            
            try { el.getContext('webgl', { powerPreference: "high-performance" }) } catch(e) {
                console.warn("something went wrong with forcing the high-performance")
            }
        })

        // console.log("colors:", this.cssColors)
        // To be deleted after project setup
        // let p = await this.$contentful.loadUrls()
        // console.log("urls",p)
    },

    beforeMount()  {
        this.detectDevice()

        this.resizeHandler()
        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('orientationchange', this.resizeHandler)
        document.addEventListener('touchstart', function()  {}, true)

        if(window._fontsAreLoaded){
            this.onFontsLoaded()
        } else{
            window.addEventListener('fonts.loaded', this.onFontsLoaded)
        }
    },

    methods: {
         ...mapActions('app', [
            'setStateApp'
        ]),

        onFontsLoaded() {
            this.setStateApp({ fontsLoaded: true })
            this.loaded = true
            this.$bus.$emit('resize')
        },

        onMouseMove(e)  {
            this.setStateApp({
                mouse: {                    
                    x: e.pageX,
                    y: e.pageY
                }
            })
        },

        resizeHandler()  {
            this.setStateApp({
                width: window.innerWidth,
                height: window.innerHeight
            })

            // this.$bus.$emit('resize')
        }
    }

}

</script>

<style lang="scss">
</style>
