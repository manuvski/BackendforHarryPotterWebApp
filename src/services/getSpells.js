const db = require('../models/index')
const Spells = db.Spell

async function getSpellsData() {
  console.log('ejecutando spells api')

  try {
    const response = await fetch('https://hp-api.onrender.com/api/spells')
    const data = await response.json()

    const dataResults = data.map((d) => ({
      spellId: d.id,
      name: d.name,
      description: d.description,
    }))

    const itemstoCreation = []
    const existedResults = await Spells.findAll()
    // console.log(existedResults)
    for (const item of dataResults) {
      const match = existedResults.find(
        (existedResult) => existedResult.spellId === item.spellId
      )
      if (!match) {
        itemstoCreation.push(item)
      }
    }
    console.log(itemstoCreation)
    if (itemstoCreation.length > 0) {
      Spells.bulkCreate(itemstoCreation)
      return 'Sincronizando base de datos'
    }

    return 'No hay datos nuevos para guardar en la base de datos'
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getSpellsData
