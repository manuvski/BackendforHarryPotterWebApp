const router = require('express').Router()
const { getStaffList, getStaffById, createStaff, updateStaff, removeStaff } = require('../controllers/staff')


router.get('/', async (request, response) => {
    try {
        const staff = await getStaffList()
        response.status(200).json(staff)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const staff = await getStaffById(id)
        response.status(200).json(staff)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const staff = await createStaff(data)
        response.status(200).json(staff)
    } catch (error) {
        console.log(error)
        response.status(500).json(error)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const staff = await updateStaff(id, data)
        response.status(200).json(staff)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeStaff(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router