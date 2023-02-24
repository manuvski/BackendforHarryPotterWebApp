const syncCharacters = require('express').Router()

const getCharactersData = require('../services/getCharacters')

syncCharacters.get('/', async (request, response) => {
  try {
    const api = await getCharactersData()
    response.status(200).json(api)
  } catch (error) {
    response.status(500).json(error)
  }
})

module.exports = syncCharacters
