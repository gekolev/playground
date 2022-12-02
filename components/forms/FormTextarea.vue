<template>
<ValidationProvider
:rules="rules"
v-slot="{ errors, valid, invalid, pristine }">
    
    <label 
    v-html='label'
    v-if='label'
    :class='labelClasses'
    :for='inputId + _uid' />

    <div 
    :class='inputClasses'>
        <div class='position-relative w-100 row'>
            <textarea
            @focus='onFocus'
            @blur='onBlur'
            v-model="value"
            :rows='rows'
            :placeholder="placeholderValue"
            :name="inputId"
            class='w-100'
            :id="inputId + _uid" />
            <small :class="errorClasses">{{ errors[0] }}</small>
        </div>
    </div>

    <slot />

</ValidationProvider>
</template>

<script>
import InputMixin from '@/components/forms/InputMixin'

export default {
    name: "form-textarea",
    mixins: [InputMixin],
    props: {
        rows: {
            default: 2
        }
    }
}
</script>