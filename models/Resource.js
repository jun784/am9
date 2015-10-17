module.exports = function (sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Resource.belongsToMany(models.Party, {through: 'PartyResource'})
        Resource.hasMany(models.Doing)
        Resource.hasMany(models.Thing, {
          foreignKey: 'AssignedTo',
          constraints: false
        })
      }
    }
  })

  return Resource
}
