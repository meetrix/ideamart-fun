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

  return ideamartService.subscribeUser(ideamartLocationApp,phoneNumber)
}
const getLocation = async function (phoneNumber) {
  return ideamartService.getLocation(ideamartLocationApp,phoneNumber,ideamartLocationConfig)
}
const sendSMS = async function (phoneNumbers,message) {

  const destinationAddresses = phoneNumbers.map(phoneNumber => `tel:${phoneNumber}` );
  return ideamartService.sendSMS(ideamartLocationApp,destinationAddresses,message);
}

module.exports = {
  subscribeUser,
  getLocation,
  sendSMS
}
