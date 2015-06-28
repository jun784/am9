module.exports = function (sequelize, DataTypes) {
  var Doing = sequelize.define('Doing', {
    startedAt: {
      type: DataTypes.DATE
    },
    endedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function (models) {}
    }
  })

  return Doing
}
