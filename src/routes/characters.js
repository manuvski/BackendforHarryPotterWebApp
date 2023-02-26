const router = require('express').Router()
const { getCharactersList } = require('../controllers/characters')


router.get('/', async (request, response) => {
    try {
        const character = await getCharactersList()
        response.status(200).json(character)
    } catch (error) {
        response.status(500)
    }
})

// router.get('/:id', async (request, response) => {
//     try {
//         const { id } = request.params
//         const mars = await getMarsById(id)
//         response.status(200).json(mars)
//     } catch (error) {
//         response.status(500).json(error)
//     }
// })

// router.post('/', async (request, response) => {
//     try {
//         const data = request.body
//         const mars = await createMars(data)
//         response.status(200).json(mars)
//     } catch (error) {
//         console.log(error)
//         response.status(500).json(error)
//     }
// })

// router.put('/:id', async (request, response) => {
//     try {
//         const { id } = request.params
//         const data = request.body
//         const mars = await updateMars(id, data)
//         response.status(200).json(mars)
//     } catch (error) {
//         response.status(500)
//     }
// })

// router.delete('/:id', async (request, response) => {
//     try {
//         const { id } = request.params
//         await removeMars(id)
//         response.status(200).json(true)
//     } catch (error) {
//         response.status(500)
//     }
// })

module.exports = router