<template>
  <div class="ctf-page-header">
    <page-header
    :title="model.fields.title" />
  </div>
</template>

<script>
import PageHeader from "@/components/headers/PageHeader";

export default {
  name: "ctf-page-header",

  props: ["model"],

  components: {
    PageHeader
  }
};
</script>