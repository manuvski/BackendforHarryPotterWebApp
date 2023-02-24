const syncApi = require('express').Router()

const getData = require('../services/api')

syncApi.get('/', async (request, response) => {
    try {
        const api = await getData()
        response.status(200).json(api)
    } catch (error) {
        response.status(500).json(error)
    }    
}
)

module.exports = syncApi
