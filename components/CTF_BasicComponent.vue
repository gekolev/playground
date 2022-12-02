<template>
  <section class="basic-ctf-comp">
    <basic-component
    :title="title" />
  </section>
</template>

<script>
import BasicComponent from '@/components/BasicComponent'
import _get from "lodash/get"
export default {
  name: "basic-ctf-comp",

  components: {
    BasicComponent
  },

  props: ["model"],

  mounted() {},

  computed: {
    title() {
      return _get(this.model, 'fields.title')
    },

    image() {
      return {
          src: this.getImage(this.model, "image", false, '?h=900?fit=fill'),
          sources: [
            {
              'src': this.getImg(this.model, "image", '?w=2560', 90),
              'srcx2': this.getImg(this.model, "image", '?w=3840'),
              'width': 1921
            },

            {
              'src': this.getImg(this.model, "image", '?w=1920'),
              'srcx2': this.getImg(this.model, "image", '?w=3840'),
              'width': 1201
            },

            {
              'src': this.getImg(this.model, "image", false, '?w=500?fit=fill'),
              'width': 768
            }
          ]
      }
    },
  }
};

</script>