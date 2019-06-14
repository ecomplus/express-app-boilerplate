'use strict'

// read app package.json
const pkg = require('./../package.json')
// Express router
const router = require('express').Router()

module.exports = appSdk => {
  // show package info on domain root
  return router.get('/', (req, res) => res.send(pkg))
}
