import { gsap } from 'gsap';
import { AnimationsMixin } from 'synchronized-components'

var WaypointTrigger = {

    data: () => ({
        lines: []
    }),

    mixins: [ AnimationsMixin || {} ],

    methods: {
        onSplited(elements) {
            this.lines.push(...elements)
        },

        toggleWaypoint(options) {

            let dir = options.visible

            let elemsToAnimate = options.el.querySelectorAll('.should-animate')

            this.runAnimation(elemsToAnimate, options.visible)

            this.visibleWaypoint = options.visible
        },

        // WAYPOINT
        toggleWaypointWithLines(options) {
            let dir = options.visible

            this.visibleWaypoint = options.visible

            let elemsToAnimate = options.el.querySelectorAll('.should-animate')
            let splitEl = options.el.querySelectorAll('.split-text')

            this.runAnimation(elemsToAnimate, options.visible, options.instant)

            if(!splitEl || !this.lines || !this.lines.length){
                return
            }

            gsap.set(splitEl, {
                opacity: 1
            })

            let from = {
                opacity: 0
            }
            from[this.textDir || 'y'] = this.textMove || -40

            let to = {
                opacity: 1,
                clearProps: 'transform',
                overwrite: true
            }
            to[this.textDir || 'y'] = 0
            to['stagger'] = this.textStagger || .1

            let f1 = options.visible ? from : to
            let f2 = options.visible ? to : from

            let duration = options.instant ? 0 
                : options.visible ? 1 
                : 0

            let stagger = options.instant ? 0 
                : options.visible ? .05 
                : 0

            let dl = options.instant ? 0 
                : options.visible ? .05 + this.delayAddition 
                : 0

            f2.delay = options.instant ? 0 
                : options.visible ? this.textDelay
                : 0

            f2.ease = 'Power3.easeOut'

            if(this.lines && this.lines.length){
                gsap.fromTo(this.lines, duration, f1, f2, stagger)
            }
        }
    }

}

export default WaypointTrigger;