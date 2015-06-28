var express = require('express')
var router = express.Router()

var models = require('../models')
var Party = models.Party
var Account = models.Account
var Resource = models.Resource

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
              return Resource.findOne({where: {fbId: account.fbId}})
                .then(function (resource) {
                  if (resource == null) return Resource.create({name: account.username, fbId: account.fbId})
                  return resource
                })
                .then(function (resource) {
                  return party.setResource([resource])
                  .then(function () {
                    var plainParty = party.get()
                    plainParty.Accounts = [account]
                    plainParty.Resources = [resource]
                    res.json(plainParty)
                  })
                })
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
  Party.findById(req.params.id)
    .then(function (party) {
      return new Promise(function (resolve, reject) {
        Account.findById(req.body.id)
          .then(function (account) {
            party.addAccount(account)
              .then(function () {
                return Resource.findOne({where: {fbId: account.fbId}})
              })
              .then(function (resource) {
                if (resource == null) Resource.create({name: account.username, fbId: account.fbId})
                return resource
              })
              .then(function (resource) {
                return party.addResource(resource)
              })
              .then(function () {
                resolve(party)
              })
          })
      })
    })
    .then(function (party) {
      return party.reload({include: [Account]})
        .then(function (party) {
          var accounts = party.Accounts
          res.json(accounts)
        })
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
          var accounts = party.Accounts
          res.json(accounts)
        })
    })
})

module.exports = router
