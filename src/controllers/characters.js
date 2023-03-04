const models = require('../models')

const getCharactersList = async () => {
  const character = await models.Character.findAll()
  return character
}

const getCharactersById = async (id) => {
  const character = await models.Character.findOne({ where: { id } })
  return character
}

const createCharacter = async ({ nasaId, sol, image }) => {
  const character = await models.Character.create({ nasaId, sol, image })
  return character
}

const updateCharacter = async (id, data) => {
  await models.Character.update(
    { ...data },
    {
      where: {
        id,
      },
    }
  )

  return getCharactersById(id)
}

const removeCharacter = async (id) => {
  await models.Character.destroy({
    where: {
      id,
    },
  })

  return true
}

module.exports = {
  getCharactersList,
  getCharactersById,
  createCharacter,
  updateCharacter,
  removeCharacter,
}
