'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const trackMeCtrl = require('./trackMeCtrl')
const logger = require('../utils/logger')

const subscribeUser = async function (req, res) {
  const phoneNumber = req.payload.phoneNumber

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
    // const msg = await trackMeCtrl.sendSMS([phoneNumber],"hello")
    return res({
      ...data
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${phoneNumber}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}
const smsReceiver = async function (req, res) {
  const payload = req.payload
  console.log(payload)

  try {
    // const data = await trackMeCtrl.getLocation(pa)
    return res({
      ...payload
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${payload}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}

const ussdReceiver = async function (req, res) {
  const message = req.query.message

  try {
    console.log(req.payload)
    // const data = await weatherCtrl.subscribeUser(phoneNumber)
    return res({
      statusCode: 'S1000',
      statusDetail: 'Success'
    })
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
  smsReceiver
}
