<template>
<ValidationProvider
:rules="rules"
v-slot="{ errors, valid, invalid, pristine }">

    <v-date-picker 
    class='w-100 date-picker'
    :id="inputId + _uid" 
    :min-date='new Date()'
    :popover="dateOptions"
    color='grey'
    v-model="value">
        <input
        class="w-100"
        type="text" 
        placeholder="Desired date" 
        :value='value | date_format' />
    </v-date-picker>

    <small :class="errorClasses">{{ errors[0] }}</small>

    <slot />

</ValidationProvider>
</template>

<script>

import InputMixin from '@/components/forms/InputMixin'
import format from 'dateformat'

export default {
  name: "form-input",
  mixins: [InputMixin],
  props: {
    dateOptions: {
        default: {}
    }
  },

  filters: {
    date_format (date) {
        if(!date){
            return
        }

        return format(new Date(date), 'mmmm dd, yyyy')
    }
   }
}
</script>

<style lang='scss' scoped>
</style>