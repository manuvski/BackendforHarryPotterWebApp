const db = require('../models')
const User = db.User
const Character = db.Character
const userRouter = require('express').Router()
const {
  toggleCharacterToFav,
  toggleStudentToFav,
  toggleStaffToFav,
  toggleSpellToFav,
  getUserByEmail,
  getUserByFavs,
} = require('../controllers/users')

userRouter.get('/profile', async (request, response) => {
  try {
    const req = request
    const user = await getUserByEmail(req.user.email)
    // console.log(user)
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

userRouter.get('/favorites/', async (request, response) => {
  try {
    const req = request
    const user = await getUserByFavs(req.user.id)
    console.log(user)
    response.status(200).json(user)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

userRouter.post('/character/fav', async (request, response) => {
  try {
    const req = request
    const { characterId } = request.body
    const user = await toggleCharacterToFav({
      characterId,
      userId: req.user.id,
    })
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

userRouter.post('/student/fav', async (request, response) => {
  try {
    const req = request
    const { studentId } = request.body
    const user = await toggleStudentToFav({
      studentId,
      userId: req.user.id,
    })
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

userRouter.post('/staff/fav', async (request, response) => {
  try {
    const req = request
    const { staffId } = request.body
    const user = await toggleStaffToFav({
      staffId,
      userId: req.user.id,
    })
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

userRouter.post('/spell/fav', async (request, response) => {
  try {
    const req = request
    const { spellId } = request.body
    const user = await toggleSpellToFav({
      spellId,
      userId: req.user.id,
    })
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

module.exports = userRouter
