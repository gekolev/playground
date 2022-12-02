import { ValidationProvider } from 'vee-validate'

var Input = {
    data: () => ({
        value: null,
        placeholderValue: null
    }),

    components: {
        ValidationProvider
    },

    props: {
        inputId: {
            default: 'form-input'
        },
        rules: null,
        model: null,
        placeholder: null,
        errorClasses: null,
        labelClasses: null,
        inputClasses: null,
        onInput: null,
        label: null,
        inputType: null
    },

    created() {
        this.value = this.model
        this.placeholderValue = this.placeholder
    },

    watch: {
        value(val){
          this.$emit('update:model', val)
        }
    },

    methods: {
        onFocus(){
            this.placeholderValue = ''
        },

        onBlur(){
            if(!this.value || this.value == ''){
                this.placeholderValue = this.placeholder
            }
        }
    }
}

export default Input;