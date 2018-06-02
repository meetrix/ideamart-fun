'use strict'

const joi = require('joi')

const weatherValidations = {
  // POST /subscribeUser
  subscribeUser: {
    headers: {},
    payload: {
      phoneNumber: joi.string().trim().required().description('phoneNumber')
    },
    options: {
      allowUnknown: true
    }
  },
  getLocation: {
    headers: {},
    query: {
      phoneNumber: joi.string().trim().required().description('phoneNumber')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = weatherValidations
