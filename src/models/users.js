'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Character, {
        through: 'usercharacter',
        as: 'favoritesCharacters',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      User.belongsToMany(models.Student, {
        through: 'userstudent',
        as: 'favoritesStudents',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      User.belongsToMany(models.Staff, {
        through: 'userstaff',
        as: 'favoritesStaff',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
      User.belongsToMany(models.Spell, {
        through: 'userspell',
        as: 'favoritesSpells',
        foreignKey: 'userId',
        onDelete: 'cascade',
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
