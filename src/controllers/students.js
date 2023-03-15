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
  const student = await Students.create({ nasaId, sol, image })
  return student
}

const updateStudents = async (id, data) => {
  const student = await Students.update(data, {
    where: {
      id,
    },
  })
  return student
}

const removeStudents = async (id) => {
  await Students.destroy({
    where: {
      id,
    },
  })

  return true
}

const getAllStudents = async (userId) => {
  try {
      const students = await models.Students.findAll();
      if (userId) {
          const studentsIds = students.map((student) => student.id);
          const favoritesStudents = await models.userstudent.findAll({
              where: {
                  studentId: studentsIds,
                  userId: userId,
              },
          });
          return students.map((student) => {
              const isFav = !!favoritesStudents.find(
                  (item) => item.studentId === student.id
              );
              return { ...student.dataValues, isFav };
          });
      }
      return students;
  } catch (error) {
      console.log('THIS IS THE ERROR, ' + error.message);
  }
};
module.exports = {
  getStudentsList,
  getStudentsById,
  createStudents,
  updateStudents,
  removeStudents,
  getAllStudents
}
