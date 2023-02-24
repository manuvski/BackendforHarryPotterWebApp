const syncStaff = require('express').Router()
const getStaffData = require('../services/getStaff')

syncStaff.get('/', async (request, response) => {
  try {
    const api = await getStaffData()
    response.status(200).json(api)
  } catch (error) {
    response.status(500).json(error)
  }
})

module.exports = syncStaff
