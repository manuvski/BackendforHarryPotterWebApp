const syncStudents = require('express').Router()
const getStudentsData = require('../services/getStudents')

syncStudents.get('/', async (request, response) => {
  try {
    const api = await getStudentsData()
    response.status(200).json(api)
  } catch (error) {
    response.status(500).json(error)
  }
})

module.exports = syncStudents
