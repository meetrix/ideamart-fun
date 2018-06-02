'use strict'

const ideamartService = require('./ideamartService')
const config = require('config')

const ideamartLocationApp = {
  applicationId: config.get('ideamartLocationApp.applicationId'),
  password: config.get('ideamartLocationApp.password'),
  version: config.get('ideamartLocationApp.version')
}

const ideamartLocationConfig = {
  serviceType: config.get('ideamartLocationApp.locationConfig.serviceType'),
  responseTime: config.get('ideamartLocationApp.locationConfig.responseTime'),
  freshness: config.get('ideamartLocationApp.locationConfig.freshness'),
  horizontalAccuracy: config.get('ideamartLocationApp.locationConfig.horizontalAccuracy')
}

const subscribeUser = async function (phoneNumber) {
  const data = {
    ...ideamartLocationApp,
    action: '1',
    subscriberId: `tel ${phoneNumber}`
  }
  return ideamartService.subscribeUser(data)
}
const getLocation = async function (phoneNumber) {
  const data = {
    ...ideamartLocationApp,
    subscriberId: `tel ${phoneNumber}`,
    ...ideamartLocationConfig

  }
  return ideamartService.getLocation(data)
}

module.exports = {
  subscribeUser,
  getLocation
}
