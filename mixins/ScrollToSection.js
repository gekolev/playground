import Animations from '@/mixins/animations'
import _get from 'lodash/get'

var ScrollToSection = {

    watch: {
        isSelected(s) {
            if(s){
                this.scrollToSection()
            }
        }
    },

    mixins: [Animations],

    mounted() {
        this.$bus.$on('scrollToSection', this.scrollToSection)
    },

    beforeDestroy(){
        this.$bus.$off('scrollToSection', this.scrollToSection)
    },

    computed: {
        selectedSection() {
            return this.$store.state.route.query.section
        },

        sectionName(){
            return _get(this.model, 'fields.navTitle').sanitize()
        },

        isSelected(){
            return this.selectedSection == this.sectionName
        },

        scrollTop() {
            return this.$store.getters['app/getState']('scrollTop')
        }
    },

    methods: {
        scrollToSection(){
            if(!this.isSelected){
                return
            }

            let top = this.$el.getBoundingClientRect().top + this.scrollTop
            this.$bus.$emit('scrollTo', top, 0)

            this.$router.push({
                query: null
            })

            
            let elemsToAnimate = this.$el.querySelectorAll('.should-animate')
            this.runAnimation(elemsToAnimate, true)
        }
    }

}

export default ScrollToSection;