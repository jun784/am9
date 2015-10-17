var Instance = require('../node_modules/sequelize/lib/instance.js')

module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    fbId: {
      type: DataTypes.STRING
    },
    fbToken: {
      type: DataTypes.STRING
    }
  }, {
    instanceMethods: {
      comparePassword: function (password) {
        // if (password == null) return false
        // return bcrypt.compareSync(password, this.password)
      },
      toJSON: function () {
        var ret = Instance.prototype.toJSON.call(this)

        delete ret.fbToken
        return ret
      }
    },
    classMethods: {
      associate: function (models) {
        Account.belongsToMany(models.Party, {through: 'PartyAccount'})
        Account.hasOne(models.Resource, {
          constraints: false
        })
      }
    }
  })

  return Account
}
