<template>
  <div 
  tabindex="0"
  @mouseenter='handleEnter'
  @mouseleave='handleLeave'
  class="dropdown-component position-relative">
      
      <div
      :class='togglerClass'
      class='cursor-pointer'
      @click='handleClick'
      @mouseenter='handleEnter'
      @mouseleave='closeDropdown'>
        <slot name='toggler' />
      </div>

      <custom-transition 
      :duration='.25'
      :noAdditionalClasses='true'>
        <div 
        @mouseenter='openDropdown'
        @mouseleave='closeDropdown'
        :key='dropdownVisible'
        v-if='dropdownVisible' >
          <slot name='dropdown' />
        </div>
      </custom-transition>

  </div>
</template>

<script>
export default {
  name: "dropdown-component",

  data: () => ({
    dropdownVisible: false
  }),

  props: {
    click: Boolean,
    visible: Boolean,
    togglerClass: String
  },

  watch: {
    dropdownVisible(visible) {
      this.$emit('update:visible', visible)
    },
    
    visible(visible) {
      this.dropdownVisible = visible
    }
  },

  methods: {
    handleClick() {
      if(this.click){
        this.dropdownVisible = !this.dropdownVisible
      }
    },

    handleEnter() {
      if(!this.click) this.openDropdown()
    },

    handleLeave() {
      if(!this.click) this.closeDropdown()
    },

    openDropdown() {
      this.t && clearTimeout(this.t)
      this.dropdownVisible = true
    },

    closeDropdown() {
      this.t = setTimeout(() => {
        this.dropdownVisible = false
      }, 150)
    }
  }
}
</script>