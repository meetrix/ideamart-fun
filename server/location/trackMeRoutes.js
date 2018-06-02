'use strict'

const config = require('config')

const trackMeHandler = require('./trackMeHandler')
const trackMeValidations = require('./trackMeValidations')

const API_PATH = '/' + config.get('app.name') + '/api/1.0'

const routes = []

// POST /subscribeUser
routes.push({
  path: API_PATH + '/subscribe',
  method: 'POST',
  handler: trackMeHandler.subscribeUser,
  config: {
    tags: ['api'],
    validate: trackMeValidations.subscribeUser
  }
})

module.exports = routes
