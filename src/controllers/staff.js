const db = require('../models')
const Staff = db.Staff

const getStaffList = async () => {
  const staff = await Staff.findAll()
  return staff
}

const getStaffById = async (id) => {
  const staff = await Staff.findOne({ where: { id } })
  return staff
}

const createStaff = async ({ nasaId, sol, image }) => {
  const staff = await Staff.create({ nasaId, sol, image })
  return staff
}

const updateStaff = async (id, data) => {
  const staff = await Staff.update(data, {
    where: {
      id,
    },
  })
  return staff
}

const removeStaff = async (id) => {
  await Staff.destroy({
    where: {
      id,
    },
  })

  return true
}

const getAllStaff = async (userId) => {
  try {
      const staffs = await models.Staff.findAll();
      if (userId) {
          const staffsIds = staffs.map((staff) => staff.id);
          const favoritesStaffs = await models.userstaff.findAll({
              where: {
                  staffId: staffsIds,
                  userId: userId,
              },
          });
          return staffs.map((staff) => {
              const isFav = !!favoritesStaffs.find(
                  (item) => item.staffId === staff.id
              );
              return { ...staff.dataValues, isFav };
          });
      }
      return staffs;
  } catch (error) {
      console.log('THIS IS THE ERROR, ' + error.message);
  }
};

module.exports = {
  getStaffList,
  getStaffById,
  createStaff,
  updateStaff,
  removeStaff,
  getAllStaff
}
