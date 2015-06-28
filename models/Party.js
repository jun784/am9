module.exports = function (sequelize, DataTypes) {
  var Party = sequelize.define('Party', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Party.belongsToMany(models.Account, {through: 'PartyAccount'})
        Party.hasMany(models.Doing)
        Party.belongsToMany(models.Resource, {through: 'PartyResource'})

      }
    }
  })

  return Party
}
