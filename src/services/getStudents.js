const db = require('../models/index')
const Students = db.Student

async function getStudentsData() {
  console.log('ejecutando student api')

  try {
    const response = await fetch(
      'https://hp-api.onrender.com/api/characters/students'
    )
    const data = await response.json()

    const dataResults = data.map((d) => ({
      studentId: d.id,
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
    const existedResults = await Students.findAll()
    // console.log(existedResults)
    for (const item of dataResults) {
      const match = existedResults.find(
        (existedResult) => existedResult.studentId === item.studentId
      )
      if (!match) {
        itemstoCreation.push(item)
      }
    }
    // console.log(itemstoCreation)
    if (itemstoCreation.length > 0) {
      Students.bulkCreate(itemstoCreation)
      return 'Sincronizando base de datos'
    }

    return 'No hay datos nuevos para guardar en la base de datos'
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = getStudentsData
