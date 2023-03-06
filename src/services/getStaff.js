const db = require('../models/index')
const Staff = db.Staff

async function getStaffData() {
  console.log('ejecutando student api')

  try {
    const response = await fetch(
      'https://hp-api.onrender.com/api/characters/staff'
    )
    const data = await response.json()

    const dataResults = data.map((d) => ({
      staffId: d.id,
      name: d.name,
      species: d.species,
      house: d.house,
      wizard: d.wizard,
      ancestry: d.ancestry,
      wand: d.wand,
      patronus: d.patronus,
      actor: d.actor,
      image: d.image,
    }))

    const itemstoCreation = []
    const existedResults = await Staff.findAll()
    // console.log(existedResults)
    for (const item of dataResults) {
      const match = existedResults.find(
        (existedResult) => existedResult.staffId === item.staffId
      )
      if (!match) {
        itemstoCreation.push(item)
      }
    }
    console.log(itemstoCreation)
    if (itemstoCreation.length > 0) {
      Staff.bulkCreate(itemstoCreation)
      return 'Sincronizando base de datos'
    }

    return 'No hay datos nuevos para guardar en la base de datos'
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getStaffData
