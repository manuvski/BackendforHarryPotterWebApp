const syncSpells = require('express').Router()
const getSpellsData = require('../services/getSpells')

syncSpells.get('/', async (request, response) => {
  try {
    const api = await getSpellsData()
    response.status(200).json(api)
  } catch (error) {
    response.status(500).json(error)
  }
})

module.exports = syncSpells
