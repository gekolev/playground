<template>
<ValidationObserver
  tag="form"
  ref='form'
  @submit.prevent="onSubmit">

    <form-group 
    v-if='showStep(index)'
    :defaultClasses='defaultClasses'
    :defaultErrorClasses="defaultErrorClasses"
    :defaultInputClasses="defaultInputClasses"
    :defaultLabelClasses='defaultLabelClasses'
    v-for='(group, index) in schema'
    :group='group'
    :buttonInGroup='buttonInGroup'
    :class="group.class"
    :key='index'>
      <!-- SUBMIT BTN -->
      <div 
      v-if='(!steps || step == schema.length - 1) && (buttonInGroup == index)'
      :class='btnWrapperClasses'> 
        <button
        type="submit"
        :class='btnClasses'>
            <div class="btnText" v-html='btnText'></div>
        </button>
      </div>
      <!-- END :: SUBMIT BTN -->
    </form-group>

    <!-- NEXT STEP -->
    <button
    v-if='steps && step != schema.length - 1'
    v-html='nextBtnText'
    @click.prevent='nextStep'
    :class='nextBtnClasses' />
    <!-- END :: NEXT STEP -->

    <!-- PREV STEP -->
    <button
    v-if='steps && step != 0'
    v-html='prevBtnText'
    @click.prevent='prevStep'
    :class='prevBtnClasses' />
    <!-- END :: PREV STEP -->

    <!-- SUBMIT BTN -->
    <div 
    v-if='(!steps || step == schema.length - 1) && !buttonInGroup'
    :class='btnWrapperClasses'>
      <button
      type="submit"
      v-html='btnText'
      :class='btnClasses' />
    </div>
    <!-- END :: SUBMIT BTN -->

    <slot></slot>
</ValidationObserver>

</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormGroup from '@/components/forms/FormGroup'
import _each from 'lodash/each'

export default {
  name: "form-generator",

  data: () => ({
    step: 0
  }),

  props: [
    "schema", 
    "buttonInGroup",
    "defaultClasses",
    "defaultErrorClasses",
    "defaultInputClasses",
    "defaultLabelClasses",
    "nextBtnText",
    "nextBtnClasses",
    "prevBtnText",
    "prevBtnClasses",
    "btnText",
    "btnClasses",
    "btnWrapperClasses",
    "steps",
    "buttonInGroup"
  ],

  methods: {
    showStep(index) {
      return !this.steps || index == this.step
    },

    async prevStep() {
      if(this.step != 0){
        this.step--
      }
    },

    async nextStep() {
      const isValid = await this.$refs['form'].validate()

      if(isValid && this.step != this.schema.length){
        this.step++
      }
    },

    async onSubmit(){
      const isValid = await this.$refs['form'].validate()

      if(isValid){
        this.$emit('submitForm', this.formData)
      }
    }
  },

  computed: {
    formData() {
      let formData = {}

      _each(this.schema, (val, key) => {
        _each(val.fields, (field, key) => {
          formData[key] = field.model
        })
      })
  
      return formData      
    }
  },

  components: {
    ValidationObserver,
    FormGroup
  }
};
</script>