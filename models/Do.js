module.exports = function (sequelize, DataTypes) {
  var Do = sequelize.define('Do', {
    startedAt: {
      type: DataTypes.DATE
    },
    endedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function (models) {
        Do.belongsToMany(models.Resource, {through: 'ResourceDo'})
      }
    }
  })

  return Do
}
