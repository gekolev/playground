const fs = require('fs')
const path = require('path')

import appConfig from '../../config/appConfig'
import contentfulConfig from '../../config/contentfulConfig'
import seoConfig from '../../config/seoConfig'
import siteConfig from '../../config/siteConfig'
import ContentfulFramework from 'contentful-framework'

const framework = new ContentfulFramework({
  appConfig,
  seoConfig,
  siteConfig,
  contentfulConfig
})

const name = require('../../ecosystem.config').apps[0].name

export default class RoutesRepository {
  /**
   * Create a route for a Contentful entity.
   * @param  {Object} entity Contentful entity.
   * @return {Object}        A route object.
   */
  generateRoute(entity) {
    return {
      url: entity.url,
      id: entity.sys.id,
      component: framework.getPageTemplate(entity),
      title: entity.fields.title
    }
  }

  async fetchRoutes(data, forceRestart){
    const routes = []

    // CMS URLs (contentful)
    let cmsItems

    try{
      cmsItems = await framework.loadUrls()
    } catch(err){
      return err
    }

    cmsItems.forEach((item) => {
      routes.push(this.generateRoute(item))
    })

    fs.writeFile(
      path.join(__dirname, '../../routes.json'),
      JSON.stringify(routes),
      function (err) {
        if (forceRestart) {
          const shellExec = require('shell-exec')
          shellExec(`cd ${process.env.FULL_PATH} && npm run build && pm2 restart ${name}`)
            .then(console.log)
            .catch(console.log)
        }

        if (err) {
          throw err
        }
      }
    )

    return routes
  }
}
