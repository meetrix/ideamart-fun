'use strict'

const ideamartService = require('./ideamartService')

const subscribeUser = async function (phoneNumber) {
  return ideamartService.subscribeUser(phoneNumber)
}

module.exports = {
  subscribeUser
}
