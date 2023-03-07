const db = require('../models')
const User = db.User
const Character = db.Character
const Student = db.Student
const Staff = db.Staff
const Spell = db.Spell

const getUserById = async (id) => {
  const user = await User.findOne(id)
  delete user.password
  return user
}
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })
  return user
}

const getCharactersFavs = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const userCharacters = await UserCharacters.findAll({
    where: {
      userId,
      characterId,
    },
  })

  const charactersIds = userCharacters.map(
    (usercharacter) => usercharacter.characterId
  )
  const characters = await Character.findAll({
    where: { id: charactersIds },
  })

  return characters.map((character) => ({
    ...character.dataValues,
    isFav: true,
  }))
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

const toggleStudentToFav = async ({ userId, studentId }) => {
  console.log({userId, studentId})
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Student,
      as: 'favoritesStudents',
    },
  })
  console.log(user)
  let currentFavList = (user.favoritesStudents || []).map((item) => item.id)
  const existed = currentFavList.includes(studentId)
  let isAdded = false

  if (!existed) {
    const students = await Student.findOne({
      where: { id: studentId },
      include: {
        model: db.User,
        as: 'favoritedByStudent',
      },
    })

    if (!students) {
      throw new Error('Student not found')
    }

    user.addFavoritesStudents(students)
    currentFavList.push(studentId)
    isAdded = true
    console.log(isAdded)
  } else {
    const newList = currentFavList.filter((item) => item !== studentId)
    user.setFavoritesStudents(newList)
    isAdded = false
  }

  return { user, isAdded }
}

const toggleStaffToFav = async ({ userId, staffId }) => {
  console.log({userId, staffId})
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Staff,
      as: 'favoritesStaff',
    },
  })
  console.log(user)
  let currentFavList = (user.favoritesStaff || []).map((item) => item.id)
  const existed = currentFavList.includes(staffId)
  let isAdded = false

  if (!existed) {
    const staff = await Staff.findOne({
      where: { id: staffId },
      include: {
        model: db.User,
        as: 'favoritedByStaff',
      },
    })

    if (!staff) {
      throw new Error('Staff not found')
    }

    user.addFavoritesStaff(staff)
    currentFavList.push(staffId)
    isAdded = true
    console.log(isAdded)
  } else {
    const newList = currentFavList.filter((item) => item !== staffId)
    user.setFavoritesStaff(newList)
    isAdded = false
  }

  return { user, isAdded }
}

const toggleSpellToFav = async ({ userId, spellId }) => {
  console.log({userId, spellId})
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Spell,
      as: 'favoritesSpells',
    },
  })
  console.log(user)
  let currentFavList = (user.favoritesSpells || []).map((item) => item.id)
  const existed = currentFavList.includes(spellId)
  let isAdded = false

  if (!existed) {
    const spell = await Spell.findOne({
      where: { id: spellId },
      include: {
        model: db.User,
        as: 'favoritedBySpell',
      },
    })

    if (!spell) {
      throw new Error('Spell not found')
    }

    user.addFavoritesSpells(spell)
    currentFavList.push(spellId)
    isAdded = true
    console.log(isAdded)
  } else {
    const newList = currentFavList.filter((item) => item !== spellId)
    user.setFavoritesSpells(newList)
    isAdded = false
  }

  return { user, isAdded }
}

module.exports = {
  toggleCharacterToFav,
  getUserByEmail,
  getCharactersFavs,
  getUserById,
  toggleStudentToFav,
  toggleStaffToFav,
  toggleSpellToFav
}
