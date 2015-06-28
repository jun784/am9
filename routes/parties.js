var express = require('express')
var router = express.Router()

var models = require('../models')
var Party = models.Party
var Account = models.Account

var jwtAuth = require('../middlewares/jwt-auth')

router.get('/', function (req, res) {
  Party.findAll()
    .then(function (things) {
      res.json(things)
    })
})

router.post('/', jwtAuth, function (req, res) {
  Party
    .create({
      name: req.body.name
    })
    .then(function (party) {
      return Account.findById(req.user)
        .then(function (account) {
          return party.setAccounts([account])
            .then(function () {
              var plainParty = party.get()
              plainParty.Accounts = [account]
              res.json(plainParty)
            })
        })
    })
})

router.get('/:id', function (req, res) {
  Party.findById(req.params.id, {include: [Account]})
    .then(function (party) {
      res.json(party)
    })
})

router.put('/:id', jwtAuth, function (req, res) {
  Party.findById(req.params.id, {include: [Account]})
    .then(function (party) {
      return party.update(req.body).then(function () {return party})
    })
    .then(function (party) {
      res.json(party)
    })
})

router.post('/:id/accounts', jwtAuth, function (req, res) {
  Party.findById(req.params.id, {include: [Account]})
    .then(function (party) {
      return new Promise(function (resolve, reject) {
        Account.findById(req.body.id)
          .then(function (account) {
            party.addAccount(account)
              .then(function () {
                resolve(party)
              })
          })
      })
    })
    .then(function (party) {
      return res.json({code: 200, message: 'YOLO'})
    })
})

router.delete('/:id/accounts', jwtAuth, function (req, res) {
  Party.findById(req.params.id, {include: [Account]})
    .then(function (party) {
      return new Promise(function (resolve, reject) {
        Account.findById(req.body.id)
          .then(function (account) {
            party.removeAccount(account)
              .then(function () {
                resolve(party)
              })
          })
      })
    })
    .then(function (party) {
      party.reload({include: [Account]})
        .then(function () {
          return res.json({code: 200, message: 'YOLO'})
        })
    })
})

module.exports = router
