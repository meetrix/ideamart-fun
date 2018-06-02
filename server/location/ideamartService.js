'use strict'

const axios = require('axios')
const logger = require('../utils/logger')
const config = require('config')

const getWeatherByCityName = async function (cityName) {
  const options = {
    method: 'get',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    params: {
      q: cityName,
      APPID: config.get('openWeather.apiKey')
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to fetch weather for ${cityName}`)
    error.logged = true
    throw error
  }
}

const subscribeUser = async function (appConfig,phoneNumber) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },

    url: `${config.get('app.baseUrl')}/subscription/send`,
    data: {
      ...appConfig,
      action: '1',
      subscriberId: `tel ${phoneNumber}`
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to subscribe user for ${phoneNumber}`)
    error.logged = true
    throw error
  }
}
const getLocation = async function (appConfig,phoneNumber,appLocationConfig) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${config.get('app.baseUrl')}/lbs/locate`,
    data: {
      ...appConfig,
      subscriberId: `tel ${phoneNumber}`,
      ...appLocationConfig

    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to get lbs for ${phoneNumber}`)
    error.logged = true
    throw error
  }
}
const sendSMS = async function (appConfig,destinationAddresses,message) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${config.get('app.baseUrl')}/sms/send`,
    data: {
      ...appConfig,
      destinationAddresses: destinationAddresses,
      message,
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to send sms for ${destinationAddresses}`)
    error.logged = true
    throw error
  }
}

module.exports = {
  getWeatherByCityName,
  subscribeUser,
  getLocation,
  sendSMS
}
