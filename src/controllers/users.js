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

  // let character = await Character.findOne({
  //   where: { id: characterId },
  // })

  // let currentFavList = user.favorites.map((item) => item.id) || []

  console.log(user)
  let currentFavList = (user.favorites || []).map((item) => item.id)
  console.log(currentFavList)
  const existed = currentFavList.includes(characterId)
  let isAdded = true

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
    isAdded = true
  }
  return { user, isAdded }
}
// =======
//   if (!existed) {
//     const characters = await Characters.findByPk(characterId)
//     if (!characters) {
//       throw new Error('Character not found')
// >>>>>>> 32f423e3fc55d538b672256eccb8f820261f5764
//     }
//     user.addFavorites(characters)
//     isAdded = true
//     console.log(isAdded)
//   } else {
//     const newList = currentFavList.filter((item) => item !== characterId)
//     user.setFavorites(newList)
//   }
//   return { user, isAdded }
// }

module.exports = {
  toggleCharacterToFav,
  getUserByEmail,
  getUserById,
}
