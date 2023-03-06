const router = require('express').Router()
const {
  getStudentsList,
  getStudentsById,
  createStudents,
  updateStudents,
  removeStudents,
} = require('../controllers/students')
router.get('/', async (request, response) => {
  try {
    const student = await getStudentsList()
    response.status(200).json(student)
  } catch (error) {
    response.status(500)
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const student = await getStudentsById(id)
    response.status(200).json(student)
  } catch (error) {
    response.status(500).json(error)
  }
})
router.post('/', async (request, response) => {
  try {
    const data = request.body
    const student = await createStudents(data)
    response.status(200).json(student)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
})
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const data = request.body
    const student = await updateStudents(id, data)
    response.status(200).json(student)
  } catch (error) {
    response.status(500)
  }
})
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    await removeStudents(id)
    response.status(200).json(true)
  } catch (error) {
    response.status(500)
  }
})
module.exports = router
