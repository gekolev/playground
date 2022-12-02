const express = require('express')
const router = express.Router()
const routesRepository = require('../repository/routes.repository').default
let repo = new routesRepository()

router.get('/generate', async (req, res, next) => {
  try {
    res.send(await repo.fetchRoutes())
  } catch (err) {
    next(err)
  }
})

router.get('/generate-restart', async (req, res, next) => {
    try {
        const reject = () => {
          res.setHeader('www-authenticate', 'Basic')
          res.sendStatus(401)
        }

        const authorization = req.headers.authorization

        if(!authorization) {
          return reject()
        }

        const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

        if(! (username === process.env.USERNAME && password === process.env.PASSWORD)) {
          return reject()
        }

        const routes = await repo.fetchRoutes(true)
        res.send(routes);
    } catch (err) {
        next(err);
    }
})

module.exports = router