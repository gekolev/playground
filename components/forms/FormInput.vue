<template>
<ValidationProvider
:rules="rules"
:name="inputId"
v-slot="{ errors, valid, invalid, pristine }">

    <label 
    :class='labelClasses'
    v-html='label'
    v-if='label' 
    :for='inputId + _uid' />

    <div 
    :class='inputClasses'>
        <div class='position-relative w-100 row'>
            <input
            @focus='onFocus'
            @blur='onBlur'
            v-model="value"
            :type="inputType || 'text'"
            :placeholder="placeholderValue"
            class='w-100'
            :name="inputId"
            :class='[{
                "input--invalid" : errors[0]
            }]'
            :id="inputId + _uid" />

            <small
            :class="errorClasses">{{ errors[0] }}</small>
        </div>
    </div>

    <slot />

</ValidationProvider>
</template>

<script>
import InputMixin from '@/components/forms/InputMixin'
export default {
  name: "form-input",
  mixins: [InputMixin],
  methods: {
    showError(errors) {
        return errors[0] && (this.value && this.value != "")
    }
  }
}
</script>