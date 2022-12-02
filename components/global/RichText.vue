<template>
  <div class="rich-text content" v-html="parsedText" />
</template>

<script>
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import _each from 'lodash/each'

export default {
  name: "rich-text",

  props: ["text"],

  mounted() {
    this.links = this.$el.querySelectorAll('.nuxt-link-fake')
    _each(this.links, link => link.addEventListener('click', this.onClick))
  },

  beforeDestroy() {
    _each(this.links, link => link.removeEventListener('click', this.onClick))
  },

  computed: {
    richOptions() {
      return {
        renderNode: {
            // This is a link
            [INLINES.HYPERLINK]: (node, next) => {
              let link = `<a href='${node.data.uri}' `
              link += this.isExternalUrl(node.data.uri) ? `target='_blank'` : `class='nuxt-link-fake'`
              link += `>${next(node.content)}`
              link += `</a>`
              return link
            },

            // This is a emedded asset
            [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
            `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description || fields.title}"/>
            <p class="img-description">${fields.description || ''}</p>`,

            // This is a asset that works as a link
            [BLOCKS.EMBEDDED_ENTRY]: ({ data: { target: { fields }}}) =>
            `<a href='${fields.url}'
             target='_blank'> 
              <img 
              src="${fields.image.fields.file.url}" 
              height="${fields.image.fields.file.details.image.height}" 
              width="${fields.image.fields.file.details.image.width}" 
              alt="${fields.image.fields.description || fields.image.fields.title}"/>
            </a>`
        }
      } 
    },

    parsedText() {
        return documentToHtmlString(this.text, this.richOptions)
    },

    websiteUrl() {
        return process.client ? location : new URL(process.env.WEBSITE_URL)
    }
  },

  methods: {
    isExternalUrl(url) {
      return new URL(url).origin !== this.websiteUrl.origin;
    },

    onClick(e) {
      e.preventDefault()
      let url = new URL(e.currentTarget.getAttribute("href"))
      this.$router.push(url.pathname)
    }
  }
}
</script>