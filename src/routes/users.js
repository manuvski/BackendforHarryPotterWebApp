const db = require('../models')
const User = db.User
const userRouter = require('express').Router()
const {
  toggleCharacterToFav,
  getCharactersFavs,
  toggleStudentToFav,
  toggleStaffToFav,
  toggleSpellToFav,
  getUserById,
  getUserByEmail,
} = require('../controllers/users')

userRouter.get('/fav-characters', async (request, response) => {
  try {
    const req = request
    const characters = await getCharactersFavs(req.user.id)
    response.status(200).json(characters)
  } catch (error) {
    console.log(error)
    response.status(500).json(error.message)
  }
})

userRouter.get('/profile', async (request, response) => {
  try {
    const req = request
    const user = await getUserByEmail(req.user.email)
    response.status(200).json(user)
  } catch (error) {
    console.log(error)
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

userRouter.post('/favorites/:marsId', async (request, response) => {
  try {
    const { marsId } = request.params
    const { user, isAdded } = await toggleTaskToFavorite({
      userId: request.user.id,
      marsId,
    })
    console.log(isAdded)

    if (isAdded) {
      response.status(200).json('Data inserted succesfully')
    } else {
      response.status(200).json('Favorite deleted ok')
    }
  } catch (error) {
    if (error.message === 'No exists data in database1') {
      response.status(400).json(error.message)
    } else {
      response.status(500).json('No exists data in database2')
      console.log(error)
    }
  }
})

userRouter.get('/favorites/:userId', async (request, response) => {
  try {
    const { userId } = request.params
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ['password', 'salt', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: db.Characters,
          through: 'userCharacters',
          as: 'favorites',
        },
      ],
    })

    response.status(200).json(user)
  } catch (error) {
    response.status(500).json(error.message)
  }
})

module.exports = userRouter
