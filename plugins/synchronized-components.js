import Vue from 'vue'

// const components = require('@synchronized-studio/synchronized-components').default
import components, { Mixins } from 'synchronized-components'

if(typeof components == 'object'){	
	Object.keys(components).forEach(key => {
	    Vue.component(key, components[key])
	})
}

// const components = {
//   ProportionDiv,
//   ImageDiv,
//   Parallax,
//   Waypoint,
//   SmoothScroll
// }