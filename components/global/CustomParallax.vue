<template>
<div ref="holder"
     class='custom-parallax parallax-wrapper'
     :class="[className, { 
        'wrapped': wrapped, 'not-wrapped': !wrapped, 
        'position-absolute': absolute 
    }]">
    
    <div 
    v-bind:style="elStyle"
    ref="parallax"
    class="parallax">
        <slot></slot>
    </div>
</div>
</template>

<script>
import { ParallaxMixin } from 'synchronized-components'

import { gsap } from 'gsap';

export default {
    name: 'custom-parallax',
    data: () => ({
        timeline: null,
        // easeRatio: 1.6
    }),

    props: {
        ease: {
            default: 'Power1.easeOut',
            type: String
        }
    },

    inject: ['scrollingProps'],

    mixins: [ParallaxMixin],

    watch: {
        currentProgress(cp) {
            // console.log("CP?!",cp, this.move)
            this.timeline && this.timeline.progress(cp)
        },

        pageWidth(){
            this.resizeHandler()
        }
    },

    computed: {
        noScale(){
            return false
        },

        elStyle() {
            if (!process.client) {
                return
            }

            return  {
                top: this.elTop + 'px', 
                height: this.elHeight + 'px'
            }
        },

        scrollTop() {
            return this.scrollingProps.currentScroll
        }
    },

    methods: {
        initParallaxTween() {
            this.timeline && this.timeline.seek(0).clear()

            let start = this.scaleFactor < 0 ? 1 - this.scaleFactor : 1
            let to = this.scaleFactor < 0 ? 1 : 1 + this.scaleFactor

            this.timeline = gsap.timeline({paused: true})
            this.timeline.fromTo(this.$refs.parallax, 1, {
                y: 0,
                scale: start
            }, {
                y: this.move,
                scale: to,
                ease: this.ease
            })


            this.timeline.progress(this.currentProgress)
        },

        resizeHandler()  {
            if (!this.$el) {
                return
            }

            this.bounds = this.$el.getBoundingClientRect()

            this.pageWidth = window.innerWidth
            this.pageHeight = window.innerHeight

            this.topBound = this.y != 0 || this.$device.isMobileOrTablet ? this.scrollTop + this.bounds.top : this.bounds.top

            this.height = this.$el.offsetHeight

            this.initParallaxTween()
        }

    }
}

</script>

<style lang="scss" scoped="">
.parallax-wrapper {
    height: 100%;
    width: 100%;

    @include media-breakpoint-down(sm) {
        &.not-wrapped {
            &>.parallax {
                transform: none!important;
                top: 0!important;
            }
        }
    }
}

.wrapped {
    overflow: hidden;
    left: 0;
    top: 0;
}

.parallax {
    position: relative;
    will-change: transform;
    height: 100%;
    backface-visibility: hidden; 
}
</style>