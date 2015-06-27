module.exports = function (sequelize, DataTypes) {
  var Party = sequelize.define('Party', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Party.belongsToMany(models.Account, {through: 'PartyAccount'})

      }
    }
  })

  return Party
}
