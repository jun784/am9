module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Tag.belongsToMany(models.Thing, {through: 'ThingTag'})
      }
    }
  })

  return Tag
}
