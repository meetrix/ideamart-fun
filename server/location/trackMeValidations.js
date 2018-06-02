'use strict'

const joi = require('joi')

const trackMeValidations = {
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
  },
  receivedSMS: {
    headers: {},
    payload: {
      sourceAddress: joi.string().trim().required().description('sourceAddress'),
      requestId: joi.string().trim().required().description('requestId'),
      encoding: joi.string().trim().required().description('encoding'),
      applicationId: joi.string().trim().required().description('applicationId'),
      message: joi.string().trim().required().description('message'),
      version: joi.string().trim().required().description('version')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = trackMeValidations
