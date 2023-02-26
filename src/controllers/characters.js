const db = require('../models')
const Character = db.Character

const getCharactersList = async () => {
    const character = await Character.findAll()
    return character
}

const getMarsById = async (id) => {
    const mars = await Mars.findByPK(id)
    return mars
}

const createMars = async ({ nasaId, sol, image }) => {
    const mars = await Mars.create({  nasaId, sol, image })
    return mars
}

const updateMars = async (id, data) => {
    const mars = await Mars.update(data, {
        where: {
            id
        }
    })
    return mars
}

const removeMars = async (id) => {
    await Mars.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getCharactersList,
    getMarsById,
    createMars,
    updateMars,
    removeMars
}