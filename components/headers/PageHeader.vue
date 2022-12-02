<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import WaypointTrigger from "@/mixins/WaypointTrigger";

export default {
  name: "page-header",

  data: () => ({}),

  props: {
    title: {
      type: [String, Boolean]
    }
  },

  mixins: [WaypointTrigger],

  watch: {},

  mounted() {
  },

  methods: {},

  computed: {},

  components: {}
};
</script>

<style lang="scss" scoped="">
.page-header {
}
</style>