'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const trackMeCtrl = require('./trackMeCtrl')
const logger = require('../utils/logger')
const lib = require('./lib');
const dynamodb = require('./dynamodb');

const subscribeUser = async function (req, res) {
  const phoneNumber = req.payload.phoneNumber

  try {
    const data = await trackMeCtrl.subscribeUser(phoneNumber);
    await dynamodb.subscribe(phoneNumber);
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

  const data = req.payload;
  const sourceAddress = data.sourceAddress.split(":")[1];
  const findAddress = data.message
  try {
    const isSubscribeUser = await dynamodb.getSubscriber(sourceAddress);

    if(isSubscribeUser.Item !== undefined && isSubscribeUser.Item.phoneNumber === sourceAddress) {

      const sub = await dynamodb.getSubscriber(findAddress);
      if(sub.Item !== undefined && sub.Item.phoneNumber === findAddress){

        const data = await trackMeCtrl.getLocation(findAddress);
        const locationUrl = lib.mapLocation(data.latitude,data.longitude);
        const sendMessage = await trackMeCtrl.sendSMS([sourceAddress],locationUrl)

      }else {

        const sendMessage = await trackMeCtrl.sendSMS([sourceAddress],"your finder still not register our app")
      }
    }else {

      const sendMessage = await trackMeCtrl.sendSMS([sourceAddress],"first subscribe our app")
    }

    return res({
      ...data
    })

  } catch (error) {
    const errorMessage = `Could not find user with id ${findAddress}`
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
