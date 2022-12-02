<template>
  <div class="basic-comp">
    <h1 v-html="title" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _get from "lodash/get"
import { ResizeMixin } from 'synchronized-components'

export default {
  name: "basic-comp",

  components: {},

  data: () => ({}),

  props: {
    title: {
      type: String
    },
  },

  mixins: [
    ResizeMixin
  ],

  watch: {},

  mounted() {},

  methods: {
      ...mapActions('app', [
          'setStateApp'
      ]),
  },

  computed: {
    ...mapState('app', [
      'width'
    ])
  }
};
</script>

<style lang="scss" scoped="">
.basic-comp {
}
</style>