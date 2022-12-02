import Vue from 'vue'
import Router from 'vue-router'
import dynamicRoutes from '@/routes.json'
// Pages
import BasicPage from '@/pages/BasicPage'

import appConfig from '@/config/appConfig'
import _each from 'lodash/each'

const components = [
  BasicPage
]

Vue.use(Router)

export function createRouter () {
  const routes = []

  dynamicRoutes.forEach((route) => {
    const comp = components.find(component => component.name === route.component)

    // @BUG - comp not found
    routes.push({
      path: route.url,
      name: route.id,
      component: comp
    })
  })

  _each(appConfig.hardcodedEntities, (entity, key) => {
      const comp = components.find(component => component.name === entity.component)

      routes.push({
        path: `/${entity.parentUrl}/:id`,
        name: key,
        component: comp
      })
  })

  return new Router({
    mode: 'history',
    routes
  })
}
