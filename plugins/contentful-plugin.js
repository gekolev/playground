import Vue from 'vue'

import ContentfulFramework, { helpers } from 'contentful-framework'

import appConfig from '@/config/appConfig'
import contentfulConfig from '@/config/contentfulConfig'
import seoConfig from '@/config/seoConfig'
import siteConfig from '@/config/siteConfig'

const contentful = new ContentfulFramework({
  appConfig,
  seoConfig,
  siteConfig,
  contentfulConfig
})

Vue.mixin({
	methods: helpers
})

export default ({ app }, inject) => {
  inject('contentful', contentful)
}