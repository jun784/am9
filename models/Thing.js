module.exports = function (sequelize, DataTypes) {
  var Thing = sequelize.define('Thing', {
    body: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Thing.belongsToMany(models.Tag, {through: 'ThingTag'})
        Thing.hasMany(models.Do)
      }
    }
  })

  return Thing
}
