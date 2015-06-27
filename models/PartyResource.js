module.exports = function (sequelize, DataTypes) {
  var PartyResource = sequelize.define('PartyResource', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function (models) {}
    }
  })

  return PartyResource
}
