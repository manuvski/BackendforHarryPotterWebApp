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

const getUserByFavs = async (userId) => {
  const user = await User.findOne({  where: { id: userId },
    attributes: {
      exclude: ['password', 'salt', 'createdAt', 'updatedAt', 'id', 'email'],
    },
    include: [
      {
        model: db.Character,
        through: 'userCharacter',
        as: 'favorites',
      },
      {
        model: db.Student,
        through: 'userstudent',
        as: 'favoritesStudents',
      },
      {
        model: db.Staff,
        through: 'userstaff',
        as: 'favoritesStaff',
      },
      {
        model: db.Spell,
        through: 'userSpell',
        as: 'favoritesSpells',
      },
    ],
  })
  return user
}


const getCharactersFavs = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const userCharacters = await usercharacters.findAll({
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
    const character = await Character.findOne({
      where: { id: characterId },
    })

    if (!character) {
      throw new Error('Character not found')
    }

    await user.addFavorites(character)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Character,
        as: 'favorites',
      },
    })

    currentFavList = (user.favorites || []).map((item) => item.id)
    isAdded = true
  } else {
    const newList = currentFavList.filter((item) => item !== characterId)
    await user.setFavorites(newList)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Character,
        as: 'favorites',
      },
    })

    currentFavList = (user.favorites || []).map((item) => item.id)
    isAdded = false
  }

  const characters = await Character.findAll({
    where: { id: currentFavList },
  })

  user.favorites = characters

  return { user, isAdded }
}

const toggleStudentToFav = async ({ userId, studentId }) => {
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Student,
      as: 'favoritesStudents',
    },
  })

  let currentFavList = (user.favoritesStudents || []).map((item) => item.id)
  const existed = currentFavList.includes(studentId)
  let isAdded = false

  if (!existed) {
    const student = await Student.findOne({
      where: { id: studentId },
    })

    if (!student) {
      throw new Error('Student not found')
    }

    await user.addFavoritesStudents(student)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Student,
        as: 'favoritesStudents',
      },
    })

    currentFavList = (user.favoritesStudents || []).map((item) => item.id)
    isAdded = true
  } else {
    const newList = currentFavList.filter((item) => item !== studentId)
    await user.setFavoritesStudents(newList)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Student,
        as: 'favoritesStudents',
      },
    })

    currentFavList = (user.favoritesStudents || []).map((item) => item.id)
    isAdded = false
  }

  const students = await Student.findAll({
    where: { id: currentFavList },
  })

  user.favoritesStudents = students

  return { user, isAdded }
}

const toggleStaffToFav = async ({ userId, staffId }) => {
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Staff,
      as: 'favoritesStaff',
    },
  })

  let currentFavList = (user.favoritesStaff || []).map((item) => item.id)
  const existed = currentFavList.includes(staffId)
  let isAdded = false

  if (!existed) {
    const staff = await Staff.findOne({
      where: { id: staffId },
    })

    if (!staff) {
      throw new Error('Staff not found')
    }

    await user.addFavoritesStaff(staff)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Staff,
        as: 'favoritesStaff',
      },
    })

    currentFavList = (user.favoritesStaff || []).map((item) => item.id)
    isAdded = true
  } else {
    const newList = currentFavList.filter((item) => item !== staffId)
    await user.setFavoritesStaff(newList)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Student,
        as: 'favoritesStaff',
      },
    })

    currentFavList = (user.favoritesStaff || []).map((item) => item.id)
    isAdded = false
  }

  const staff = await Staff.findAll({
    where: { id: currentFavList },
  })

  user.favoritesStaff = staff

  return { user, isAdded }
}

const toggleSpellToFav = async ({ userId, spellId }) => {
  let user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password', 'salt'] },
    include: {
      model: db.Spell,
      as: 'favoritesSpells',
    },
  })

  let currentFavList = (user.favoritesSpells || []).map((item) => item.id)
  const existed = currentFavList.includes(spellId)
  let isAdded = false

  if (!existed) {
    const spell = await Spell.findOne({
      where: { id: spellId },
    })

    if (!spell) {
      throw new Error('Spell not found')
    }

    await user.addFavoritesSpells(spell)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Spell,
        as: 'favoritesSpells',
      },
    })

    currentFavList = (user.favoritesSpells || []).map((item) => item.id)
    isAdded = true
  } else {
    const newList = currentFavList.filter((item) => item !== spellId)
    await user.setFavoritesSpells(newList)
    user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'salt'] },
      include: {
        model: db.Spell,
        as: 'favoritesSpells',
      },
    })

    currentFavList = (user.favoritesSpells || []).map((item) => item.id)
    isAdded = false
  }

  const spells = await Spell.findAll({
    where: { id: currentFavList },
  })

  user.favoritesSpells = spells

  return { user, isAdded }
}


module.exports = {
  getUserByEmail,
  getCharactersFavs,
  getUserById,
  toggleStudentToFav,
  toggleStaffToFav,
  toggleSpellToFav,
  toggleCharacterToFav,
  getUserByFavs
}
