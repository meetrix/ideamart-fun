'use strict'

const config = require('config')

const trackMeHandler = require('./trackMeHandler')
const trackMeValidations = require('./trackMeValidations')

const API_PATH = '/' + config.get('app.name') + '/api/1.0'

const routes = []

// POST /subscribeUser
routes.push.apply(routes, [
  {
    path: API_PATH + '/subscribe',
    method: 'POST',
    handler: trackMeHandler.subscribeUser,
    config: {
      tags: ['api'],
      validate: trackMeValidations.subscribeUser
    }
  },
  {
    path: API_PATH + '/lbs',
    method: 'POST',
    handler: trackMeHandler.getLocation,
    config: {
      tags: ['api'],
      validate: trackMeValidations.getLocation
    }
  },
  {
    path: API_PATH + '/ussd/receiver',
    method: 'POST',
    handler: trackMeHandler.ussdReceiver,
    config: {
      tags: ['api'],
      validate: trackMeValidations.validateUssdReceiver
    }
  },
  {
    path: API_PATH + '/sms/receiver',
    method: 'POST',
    handler: trackMeHandler.smsReceiver,
    config: {
      tags: ['api'],
      validate: trackMeValidations.validateSmsReceiver
    }
  }
])

module.exports = routes
