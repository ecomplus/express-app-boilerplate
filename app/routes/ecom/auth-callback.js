'use strict'

// log on files
const logger = require('console-files')

module.exports = appSdk => {
  return (req, res) => {
    // E-Com Plus Store ID from request header
    const storeId = parseInt(req.get('x-store-id'), 10)

    // handle callback with E-Com Plus app SDK
    // https://github.com/ecomclub/ecomplus-app-sdk
    appSdk.handleCallback(storeId, req.body)

      .then(({ isNew, authenticationId }) => {
        // authentication tokens were updated
        res.status(204)
        res.end()
      })

      .catch(err => {
        if (typeof err.code === 'string' && !err.code.startsWith('SQLITE_CONSTRAINT')) {
          // debug SQLite errors
          logger.error(err)
        }
        res.status(500)
        let { message } = err
        res.send({
          error: 'auth_callback_error',
          message
        })
      })
  }
}
