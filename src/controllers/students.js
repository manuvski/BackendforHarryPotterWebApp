const db = require('../models')
const Students = db.Student

const getStudentsList = async () => {
    const students = await Students.findAll()
    return students
}

const getStudentsById = async (id) => {
    const student = await Students.findOne({ where: { id } })
    return student
}

const createStudents = async ({ nasaId, sol, image }) => {
    const student = await Students.create({  nasaId, sol, image })
    return student
}

const updateStudents = async (id, data) => {
    const student = await Students.update(data, {
        where: {
            id
        }
    })
    return student
}

const removeStudents = async (id) => {
    await Students.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getStudentsList,
    getStudentsById,
    createStudents,
    updateStudents,
    removeStudents
}