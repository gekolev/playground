<template>
    <scrolling-page
    :pageId='model.sys.id'>
        <div class="basic-page">
            <!-- TEST CODE DELETE AFTER SETUP -->
            <div>
              <h1 class="pt-5">Hello BasicPage!</h1>
            </div>
            <!-- END :: TEXT CODE -->

           
            <!-- Page Components -->
            <component 
            v-if="model.fields.components"
            v-for='(component, index) in model.fields.components'
            :model='component'
            :is='getComponentTemplate(component)'
            :key='index' />
        </div>
    </scrolling-page>
</template>

<script>
import PageComponents from '@/mixins/PageComponents';
import BasePage from '@/mixins/BasePage';

export default {
  name: 'BasicPage',

  components: {},

  mixins: [BasePage, PageComponents],
  
  // computed: {
  //   images() {
  //     let images = []

  //     Object.values(this.model.fields.components[0].fields.projects).forEach(item => {
  //       images.push(this.getImg(item, "featuredGallery", "?w=1920"))
  //     })

  //     return images
  //   }
  // },  

  async asyncData ({$contentful, route, store}) {
    const urls = store.getters['pages/getState']('urls')

    const activePage = await $contentful.loadActivePage({
      route: route.path,
      id: route.name,
      urls,
      include: 4
    })

    store.dispatch('pages/SET_STATE', {
      activePage
    })

    return {
      model: activePage
    }
  }
}
</script>
