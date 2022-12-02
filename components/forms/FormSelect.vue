<template>
<ValidationProvider
:rules="rules"
v-slot="{ errors, valid, invalid, pristine }">

    <v-select
      class='v-select input'
      :id="inputId + _uid"
      :placeholder='placeholder'
      v-model="value"
      :class='{
          "input--invalid" : errors[0]
      }'
      @search:focus='onFocus'
      @search:input='onBlur'
      @search:blur='onBlur'
      :components="{OpenIndicator, Deselect}"
      :options="options"
      autocomplete="off"/>

    <small :class="errorClasses">{{ errors[0] }}</small>

    <slot />

</ValidationProvider>
</template>

<script>
// https://vue-select.org/
import InputMixin from '@/components/forms/InputMixin'

export default {
  name: "form-input",

  data: () => ({
    OpenIndicator: {
      render: createElement => createElement('img', {
        attrs: {
            // src: require('../../static/small_arrow.svg'),
            class: 'input-arrow'
        }
      }),
    },

    Deselect: {
        render: createElement => createElement('span', ''),
    }
  }),

  methods: {
    onFocus(){
        this.$bus.$emit('disableScrollbar')
    },
    onBlur() {
        this.$bus.$emit('enableScrollbar')
    }
  },

  mixins: [InputMixin],
  props: {
    options: {
        default: []
    }
  }
}
</script>

<style lang='scss'>
/*! purgecss start ignore */
$vs-colors: (
        lightest: rgba(60, 60, 60, 0.26),
        light: rgba(60, 60, 60, 0.5),
        dark: #fff,
        darkest: rgba(0, 0, 0, .15),
) !default;

//  Global Component Variables
$vs-component-line-height: 1.4 !default;
$vs-component-placeholder-color: $white;

//  Active State
$vs-state-active-bg: #222;
$vs-state-active-color: white;

//  Borders
$vs-border-width: 1px;
$vs-border-style: solid;
$vs-border-radius: 0;
$vs-border-color: white;

//  Component Controls: Clear, Open Indicator
$vs-controls-color: white;
$vs-controls-size: 1;
$vs-controls-deselect-text-shadow: none;

//  Selected
$vs-selected-bg: #3F3F3F !default;
$vs-selected-border-color: white;
$vs-selected-border-style: solid;
$vs-selected-border-width: 1px;

//  Dropdown
$vs-dropdown-z-index: 1000 !default;
$vs-dropdown-min-width: 160px !default;
$vs-dropdown-max-height: 160px !default;
$vs-dropdown-box-shadow: none;
$vs-dropdown-bg: #3F3F3F !default;

@import "~vue-select/src/scss/vue-select.scss";

.v-select{
    padding-bottom: 1px!important;
    background: $white;
    border: 1px solid $black;

    .vs__dropdown-toggle{
        padding: 0
    }

    .vs__selected{
        padding: 0;
        margin-left: 0!important;
    }

    .vs__selected-options{
        padding: 0!important;
    }

    .vs__search{
        padding: 0!important;
    }

    .vs__open-indicator{
        height: auto;
        width: 1.2em;
    }

    .vs__actions{
        padding: 0;
    }

    .vs__dropdown-menu{
        border: none;
        color: white;
        text-transform: uppercase;
    }

    .vs__search::placeholder, .vs__dropdown-toggle{
        border: none;
        color: white;
        text-transform: uppercase;
    }

    .vs__dropdown-menu{
        padding: 0;
    }

    .vs__dropdown-option{
        color: white;
        padding: 6px 20px 2px 20px;
    }


    .vs__clear, .vs__open-indicator {
        fill: white;
    }
}
/*! purgecss end ignore */
</style>
