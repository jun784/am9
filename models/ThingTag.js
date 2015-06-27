module.exports = function (sequelize, DataTypes) {
  var TagThing = sequelize.define('TagThing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    priority: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function (models) {
      }
    }
  })

  return TagThing
}
