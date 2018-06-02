'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const weatherCtrl = require('./trackMeCtrl')
const logger = require('../utils/logger')

const subscribeUser = async function (req, res) {
  const phoneNumber = req.query.phoneNumber

  try {
    const data = await weatherCtrl.subscribeUser(phoneNumber)
    return res({
      ...data
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${phoneNumber}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}

module.exports = {
  subscribeUser
}
