<template>
<transition v-on:enter="enter"
            v-on:before-enter="beforeEnter"
            v-on:after-enter="afterEnter"
            v-on:leave="leave"
            :mode='mode'
            v-bind:css="false">
   <slot></slot>
</transition>

</template>

<script>
import { gsap, TimelineMax } from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'customTransition',

    computed: {
        dur(){
            return this.$store.getters['app/getState']("instantTransition") && this.pageTransition ? 0 : this.duration
        },
        delay(){
            return this.pageTransition ? this.dl : 0
        }
    },

    props: {
        dl: {
            default: .2
        },

        noAdditionalClasses: false,

        pageTransition: false,
        mode: false,

        duration: {
            default: .6
        }
    },

    methods: {
         ...mapActions('app', [
            'setStateApp'
        ]),

        afterEnter: function(el, done)  {},

        beforeEnter(el, done)  {},

        enter(el, done)  {

            this.tl = new TimelineMax({
                onComplete: () => {
                    if(this.pageTransition){
                        setTimeout(() => {
                            this.$emit('update:loading', false)
                        }, 400)
                    }

                    done()
                }
            })

            this.tl.fromTo(el, this.dur, {
                opacity: 0
            }, {
                opacity: 1,
                delay: this.delay
            })
        },

        leave(el, done)  {

            if(this.pageTransition){}

            if(!this.noAdditionalClasses && this.mode != "out-in"){
                let cls = this.pageTransition ? ['transitioning-out'] : ['transitioning-out'] 
                el.classList.add(...cls);
            }

            let d = this.pageTransition ? this.dur / 2 : this.dur

            gsap.to(el, d, {
                opacity: 0,
                delay: .1,
                onComplete: () => {

                    if(this.pageTransition){
                        window.scrollTo(0, 0)
                        this.setStateApp({
                            scrollTop: 0,
                            instantTransition: false,
                            menuOpen: false 
                        })
                    }
                    
                    this.$nextTick(done)
                }
            })

        }
    }
}

</script>