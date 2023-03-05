'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Character.belongsToMany(models.User, {
        through: 'usercharacter',
        as: 'favoritedBy',
        foreignKey: 'CharacterId',
        onDelete: 'cascade',
      })
    }
  }
  Character.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      characterId: DataTypes.STRING,
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
      modelName: 'Character',
    }
  )
  return Character
}
