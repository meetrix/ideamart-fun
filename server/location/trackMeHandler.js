'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const trackMeCtrl = require('./trackMeCtrl')
const logger = require('../utils/logger')
const lib = require('./lib');

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
    const data = await trackMeCtrl.getLocation(phoneNumber);
    //const msg = await trackMeCtrl.sendSMS([phoneNumber],"hello")
    const locationUrl = lib.mapLocation(data.latitude,data.longitude);
    const msg = await trackMeCtrl.sendSMS([phoneNumber],locationUrl)
    return res({
      ...data
    })
  } catch (error) {
    const errorMessage = `Could not subscribe user with id ${phoneNumber}`
    !error.logged && logger.error(error, errorMessage)
    return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  }
}
const receivedSMS = async function (req, res) {
  const payload = req.payload
  console.log(payload);

  // try {
  //   const data = await trackMeCtrl.getLocation(phoneNumber)
  //   return res({
  //     ...data
  //   })
  // } catch (error) {
  //   const errorMessage = `Could not subscribe user with id ${phoneNumber}`
  //   !error.logged && logger.error(error, errorMessage)
  //   return res(boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }))
  // }
}

module.exports = {
  subscribeUser,
  getLocation,
  receivedSMS
}
