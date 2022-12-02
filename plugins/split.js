import Vue from 'vue'
import SplitText from '~/plugins/scripts/SplitText.min.js';

const VueSelect = {
  install(Vue, options) {
    Vue.component('split', SplitText)
  }
};
Vue.use(VueSelect);
export default VueSelect;