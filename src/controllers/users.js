const db = require('../models')
const User = db.User
const Character = db.Character

const getUserById = async (id) => {
  const user = await User.findOne(id)
  delete user.password
  return user
}
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}
const toggleCharacterToFav = async ({ userId, characterId }) => {
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Character,
      as: 'favorites',
    },
  })
  console.log(user)
  let currentFavList = (user.favorites || []).map((item) => item.id)
  const existed = currentFavList.includes(characterId)
  let isAdded = false

  if (!existed) {
    const characters = await Character.findOne({
      where: { id: characterId },
      include: {
        model: db.User,
        as: 'favoritedBy',
      },
    })

    if (!characters) {
      throw new Error('Character not found')
    }
    user.addFavorites(characters)
    currentFavList.push(characterId)
    isAdded = true
    console.log(isAdded)
  } else {
    const newList = currentFavList.filter((item) => item !== characterId)
    user.setFavorites(newList)
    isAdded = false
  }
  return { user, isAdded }
}

module.exports = {
  toggleCharacterToFav,
  getUserByEmail,
  getUserById,
}
