'use strict'

const axios = require('axios')
const config = require('config')
const logger = require('../utils/logger')

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
const ideamartConfig = {
  applicationId: config.get('ideamart.applicationId'),
  password: config.get('ideamart.password'),
  version: config.get('ideamart.version')
}

const subscribeUser = async function (phoneNumber) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'http://localhost:7000/subscription/send',
    data: {
      ...ideamartConfig,
      action: '1',
      subscriberId: `tel ${phoneNumber}`
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to fetch weather for ${phoneNumber}`)
    error.logged = true
    throw error
  }
}

module.exports = {
  getWeatherByCityName,
  subscribeUser
}
