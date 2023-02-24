'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      studentId: {
        type: Sequelize.STRING,
      },
      species: {
        type: Sequelize.STRING,
      },
      house: {
        type: Sequelize.STRING,
      },
      wizard: {
        type: Sequelize.STRING,
      },
      ancestry: {
        type: Sequelize.STRING,
      },
      wand: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
        get() {
          return JSON.parse(this.getDataValue('wand'))
        },
        set(value) {
          this.setDataValue('wand', JSON.stringify(value))
        },
      },
      patronus: {
        type: Sequelize.STRING,
      },
      actor: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};