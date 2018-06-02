'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const trackMeCtrl = require('./trackMeCtrl')
const logger = require('../utils/logger')

const subscribeUser = async function (req, res) {
  const phoneNumber = req.query.phoneNumber

  try {
    const data = await trackMeCtrl.subscribeUser(phoneNumber)
    return res({
      ...data
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${phoneNumber}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}
const getLocation = async function (req, res) {
  const phoneNumber = req.query.phoneNumber

  try {
    const data = await trackMeCtrl.getLocation(phoneNumber)
    return res({
      ...data
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${phoneNumber}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}

const ussdReceiver = async function (req, res) {
  const message = req.query.message

  try {
    // const data = await weatherCtrl.subscribeUser(phoneNumber)
    // return res({
    //   ...data
    // })
    console.log(req.query)
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${message}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}

module.exports = {
  subscribeUser,
  ussdReceiver,
  getLocation,
}
