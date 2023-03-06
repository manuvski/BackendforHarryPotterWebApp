'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('userstudent', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        onDelete: 'casacade',
      },

      studentId: {
        type: Sequelize.UUID,
        primaryKey: true,
        onDelete: 'casacade',
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('userstudent')
  },
}
