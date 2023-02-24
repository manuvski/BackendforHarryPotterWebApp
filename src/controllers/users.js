const db = require('../models')
const User = db.User
const Characters = db.Characters

const getUserById = async (id) => {
  const user = await User.findByPK(id)
  delete user.password
  return user
}
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}
const toggleTaskToFavorite = async ({ userId, marsId }) => {
  let user = await User.findByPk(userId, {
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Characters,
      as: 'favorites',
    },
  })

  let currentFavList = user.favorites.map((item) => item.id) || []
  console.log(currentFavList)
  const existed = currentFavList.includes(marsId)
  let isAdded = false

  if (!existed) {
    const characters = await Characters.findByPk(characterId)
    if (!characters) {
      throw new Error('Character not found')
    }
    user.addFavorites(characters)
    isAdded = true
    console.log(isAdded)
  } else {
    const newList = currentFavList.filter((item) => item !== characterId)
    user.setFavorites(newList)
  }
  return { user, isAdded }
}

module.exports = {
  toggleTaskToFavorite,
  getUserByEmail,
  getUserById,
}
