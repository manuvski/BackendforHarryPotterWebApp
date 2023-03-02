const router = require('express').Router()
const {
  getCharactersList,
  getCharactersById,
  createCharacter,
  updateCharacter,
  removeCharacter,
} = require('../controllers/characters')
router.get('/', async (request, response) => {
  try {
    const character = await getCharactersList()
    response.status(200).json(character)
  } catch (error) {
    response.status(500)
  }
})
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const character = await getCharactersById(id)
    response.status(200).json(character)
  } catch (error) {
    response.status(500).json(error)
  }
})
router.post('/', async (request, response) => {
  try {
    const data = request.body
    const character = await createCharacter(data)
    response.status(200).json(character)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
})
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const data = request.body
    const character = await updateCharacter(id, data)
    response.status(200).json(character)
  } catch (error) {
    response.status(500)
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    await removeCharacter(id)
    response.status(200).json(true)
  } catch (error) {
    response.status(500)
  }
})
module.exports = router
