import Vue from 'vue'
import imagesLoaded from 'imagesloaded';
import _get from 'lodash/get'

var BasePage = {

    mounted() {
        if(this.resizeHandler){
            this.$bus.$on('resize', this.resizeHandler)
            this.$nextTick(this.resizeHandler)
        }

        imagesLoaded(this.$el, () => {
            this.$bus.$emit('resize')
        })
    },

    beforeDestroy(){
        if(this.resizeHandler){
            this.$bus.$off('resize', this.resizeHandler)
        }
    },

    computed: {
    },

    methods: {
        getComponentTemplate(component) {
            let template = _get(component, 'fields.template') || _get(component, 'sys.contentType.sys.id')
            if(!template){
                return
            }
            return this.returnComponent("CTF_" + template.capitalize())
        },
        
        returnComponent(component){
            let componentExists = Vue.options.components[component]
            || this.$options.components[component]
            return componentExists ? component : null
        }
    }

}


export default BasePage;
