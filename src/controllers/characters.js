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

const getAllCharacters = async (userId) => {
  try {
      const characters = await models.Character.findAll();
      if (userId) {
          const charactersIds = characters.map((character) => character.id);
          const favoritesCharacters = await models.usercharacter.findAll({
              where: {
                  characterId: charactersIds,
                  userId: userId,
              },
          });
          return characters.map((character) => {
              const isFav = !!favoritesCharacters.find(
                  (item) => item.characterId === character.id
              );
              return { ...character.dataValues, isFav };
          });
      }
      return characters;
  } catch (error) {
      console.log('THIS IS THE ERROR, ' + error.message);
  }
};

module.exports = {
  getCharactersList,
  getCharactersById,
  createCharacter,
  updateCharacter,
  removeCharacter,
  getAllCharacters
}
