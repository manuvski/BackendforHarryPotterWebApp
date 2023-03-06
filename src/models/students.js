'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Student.belongsToMany(models.User, {
        through: 'userstudent',
        as: 'favoritedByStudent',
        foreignKey: 'studentId',
        onDelete: 'cascade',
      })
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      studentId: DataTypes.STRING,
      name: DataTypes.STRING,
      species: DataTypes.STRING,
      house: DataTypes.STRING,
      wizard: DataTypes.STRING,
      ancestry: DataTypes.STRING,
      wand: DataTypes.JSON,
      patronus: DataTypes.STRING,
      actor: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  )
  return Student
}
