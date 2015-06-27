var express = require('express')
var router = express.Router()

var models = require('../models')
var Account = models.Account
var Party = models.Party

var jwtAuth = require('../middlewares/jwt-auth')

router.get('/', jwtAuth, function (req, res) {
  Account.findById(req.user, { include: [ Party ] }).then(function (user) {
    res.json(user)
  })
})

module.exports = router
