const db = require('../models')
const Spells = db.Spell

const getSpellsList = async () => {
  const spell = await Spells.findAll()
  return spell
}

const getSpellsById = async (id) => {
  const spell = await Spells.findOne({ where: { id } })
  return spell
}

const createSpells = async ({ nasaId, sol, image }) => {
  const spell = await Spells.create({ nasaId, sol, image })
  return spell
}

const updateSpells = async (id, data) => {
  const spell = await Spells.update(data, {
    where: {
      id,
    },
  })
  return spell
}

const removeSpells = async (id) => {
  await Mars.destroy({
    where: {
      id,
    },
  })

  return true
}

const getAllSpells = async (userId) => {
  try {
      const spells = await models.Spells.findAll();
      if (userId) {
          const spellsIds = spells.map((spell) => spell.id);
          const favoritesSpells = await models.userspell.findAll({
              where: {
                  spellId: spellsIds,
                  userId: userId,
              },
          });
          return spells.map((spell) => {
              const isFav = !!favoritesSpells.find(
                  (item) => item.spellId === spell.id
              );
              return { ...spell.dataValues, isFav };
          });
      }
      return spells;
  } catch (error) {
      console.log('THIS IS THE ERROR, ' + error.message);
  }
};

module.exports = {
  getSpellsList,
  getSpellsById,
  createSpells,
  updateSpells,
  removeSpells,
  getAllSpells
}
