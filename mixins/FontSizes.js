import { mapState } from 'vuex'
import _each from 'lodash/each'
import _mapValues from 'lodash/mapValues'
import _mapKeys from 'lodash/mapKeys'

const FontSizesMixin = {
  watch: {
    cssFontSizes(val){
      this.setFontSizes(val)
    }
  },

  computed: {
    ...mapState('app', [
      'width'
    ]),

    initialFontSizes() {
        return this.makeStyle(this.$FONT_SIZES)
    },

    cssFontSizes() {
      let sizes

      if(this.width !== 0){
        sizes = _mapValues(this.$FONT_SIZES, size => {
          let unit = size.slice(-2)

          if(unit == 'vw'){
            size = size.substring(0, size.length - 2)
            size *= this.width / 100
            size += 'px'
          }

          return size
        })
      }

      return sizes
    }
  },

  beforeMount()  {
    this.setFontSizes()
  },

  methods: {
    makeStyle(obj){
      return JSON.stringify(obj).slice(1, -1).split('"').join("").split(",").join(";")
    },

    setFontSizes(val) {
      _each(val, (v, key) => {
          document.documentElement.style.setProperty(key, v)
      })
    }
  }
}

export default FontSizesMixin