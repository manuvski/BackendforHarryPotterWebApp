const db = require('../models')
const Character = db.Character

const getCharactersList = async () => {
    const character = await Character.findAll()
    return character
}

const getCharactersById = async (id) => {
    const character = await Character.findByPK(id)
    return character
}

const createCharacter = async ({ nasaId, sol, image }) => {
    const character = await Character.create({  nasaId, sol, image })
    return character
}

const updateCharacter = async (id, data) => {
    const character = await Character.update(data, {
        where: {
            id
        }
    })
    return character
}

const removeCharacter = async (id) => {
    await Character.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getCharactersList,
    getCharactersById,
    createCharacter,
    updateCharacter,
    removeCharacter
}