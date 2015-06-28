var express = require('express')
var router = express.Router()

var models = require('../models')
var Party = models.Party
var Resource = models.Resource
var Doing = models.Doing
var Thing = models.Thing

var jwtAuth = require('../middlewares/jwt-auth')

router.get('/', function (req, res) {
  Doing.findAll({include: [Party, Resource]})
    .then(function (doings) {
      res.json(doings)
    })
})
router.post('/', jwtAuth, function (req, res) {
  Doing
    .create({
      startedAt: req.body.startedAt,
      endedAt: req.body.endedAt,
      PartyId: req.body.PartyId,
      ThingId: req.body.ThingId,
      Resource: req.body.ResourceId
    })
    .then(function (doing) {
      return doing.reload({include: [Party, Resource, Thing]})
        .then(function (doing) {
          res.json(doing)
        })
    })
})

router.get('/:id', function (req, res) {
  Doing.findById({include: [Party, Resource, Thing]})
    .then(function (doing) {
      res.json(doing)
    })
})

router.put('/:id', function (req, res) {
  Doing.findById({include: [Party, Resource, Thing]})
    .then(function (doing) {
      return doing.update({
        startedAt: req.body.startedAt,
        endedAt: req.body.endedAt,
        PartyId: req.body.PartyId,
        ThingId: req.body.ThingId,
        Resource: req.body.ResourceId
      }).then(function () {
        return doing.reload({include: [Party, Resource, Thing]})
          .then(function (doing) {
            res.json(doing)
          })
      })
    })
})

router.delete('/:id', function (req, res) {
  Doing.findById()
    .then(function (doing) {
      doing.destroy()
        .then(function () {
          res.json({code: 200, message: 'yolo'})
        })
    })
})

module.exports = router
