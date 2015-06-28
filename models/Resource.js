module.exports = function (sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    name: {
      type: DataTypes.STRING
    },
    fbId: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Resource.belongsToMany(models.Party, {through: 'PartyResource'})
        Resource.belongsToMany(models.Doing, {through: 'ResourceDoing'})
      }
    }
  })

  return Resource
}
