import _find from 'lodash/find'
import _get from 'lodash/get'
import _isString from 'lodash/isString'
import _each from 'lodash/each'

var VimeoMixin = {
    methods: {
        async initVimeo(vimeoId) {
        
        let resp = await this.$axios.$get(`/api/vimeo/video/${vimeoId}`)

        // there must be a better way to find the file url
        let url = _find(resp.files, { width: 1920 })
        if(!url){
          url = _find(resp.files, { width: 1280 })
        }

        if(!url){
          url = _find(resp.files, { width: 1366 })
        }

        let video = resp
        let videoSrc = url ? url.link : null


        let poster = resp.pictures ? _find(resp.pictures.sizes, { width: 1920 }) : null

        this.vimeoPosterUrl = poster ? poster.link : null

        return `${videoSrc}#t=1`
      },

      async getVideoSrc() {
        return this.vimeoId ? await this.initVimeo(this.vimeoId) : `https:${_get(this.asset, 'fields.file.url')}`
      },

      getAttr(attrName) {

        let field
        if(_isString(attrName)){
          field = _get(this.model, `fields.${attrName}`)
        } else{
           _each(attrName, name => {
            let val = _get(this.model, `fields.${name}`)

            if(val){
              field = val
              return 
            }
          })
        }

        return field
      }

    }
}

export default VimeoMixin
