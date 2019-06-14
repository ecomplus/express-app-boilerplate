'use strict'

// read app package.json
const pkg = require('./../package.json')
// setup Express router
const router = require('express').Router()

module.exports = appSdk => {
  // base routes for E-Com Plus Store API
  ;[ 'auth-callback', 'webhook' ].forEach(route => {
    let filename = `/ecom/${route}`
    router.use(filename, require(`.${filename}`)(appSdk))
  })

  // show package info on domain root
  router.get('/', (req, res) => res.send(pkg))

  /* Add custom app routes here */
}
