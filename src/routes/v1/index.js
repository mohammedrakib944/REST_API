const express = require('express')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const ispOwnerRoute = require('./ispOwner.route')
const managerRoute = require('./manager.route')
const collectorRoute = require('./collector.route')
const docsRoute = require('./docs.route')
const config = require('../../config/config')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/ispOwner',
    route: ispOwnerRoute,
  },
  {
    path: '/manager',
    route: managerRoute,
  },
  {
    path: '/collector',
    route: collectorRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

module.exports = router
