<template>
<ValidationProvider
:rules="rules"
class='form-checkbox'
v-slot="{ errors, valid, invalid, pristine }">


    <label class="checkbox-label color-grey">
        <input 
        :id="inputId + _uid"
        :name="inputId"
        v-model='value' 
        type="checkbox">
        <span class="checkbox-custom rectangular"></span>
        {{placeholder}}
    </label>

    <small v-if='rules' 
    :class="errorClasses">{{ errors[0] }}</small>

    <slot />

</ValidationProvider>
</template>

<script>
import InputMixin from '@/components/forms/InputMixin'
export default {
  name: "form-checkbox",
  mixins: [InputMixin]  
}
</script>