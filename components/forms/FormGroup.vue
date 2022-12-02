<template>
  <div>
    <component
      v-for='(input, i) in group.fields'
      :key='i'
      :is='`form-${input.type}`'
      :errorClasses='input.errorClasses || defaultErrorClasses'
      :model.sync='group.fields[i].model'
      :rules='input.rules'
      :placeholder='input.placeholder'
      :options='input.options'
      :dateOptions='input.dateOptions'
      :label='input.label'
      :inputClasses='`${defaultInputClasses} ${input.inputClasses}`'
      :labelClasses='`${defaultLabelClasses} ${input.labelClasses}`'
      :rows='input.rows'
      :class='`${defaultClasses} ${input.class}`'
      :inputType='input.inputType'
      :inputId='i' />
      
      <slot />
  </div>
</template>

<script>
import FormInput from '@/components/forms/FormInput'
import FormTextarea from '@/components/forms/FormTextarea'
// import FormCheckbox from '@/components/forms/FormCheckbox'
// import FormSelect from '@/components/forms/FormSelect'
// import FormDate from '@/components/forms/FormDate'
import _each from 'lodash/each'

export default {
  name: "form-group",

  data: () => ({
  }),

  props: [
    "group", 
    'defaultClasses',
    "defaultErrorClasses",
    "defaultInputClasses",
    "defaultLabelClasses"
  ],

  components: {
    FormInput,
    FormTextarea,
    // FormCheckbox,
    // FormSelect,
    // FormDate
  }
};
</script>