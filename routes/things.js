var express = require('express')
var router = express.Router()

var models = require('../models')
var Thing = models.Thing
var Tag = models.Tag

var jwtAuth = require('../middlewares/jwt-auth')

router.get('/', jwtAuth, function (req, res) {
  Thing.findAll({include: [Tag]})
    .then(function (things) {
      res.json(things)
    })
})

router.get('/:id', jwtAuth, function (req, res) {
  Thing.findById(req.params.id, {include: [Tag]})
    .then(function (thing) {
      res.json(thing)
    })
})

router.post('/', jwtAuth, function (req, res) {
  Thing
    .create({
      body: req.body.body
    })
    .then(function (thing) {
      if (thing == null) return res.status(404).send({message: 'Not Found'})
      var tagNames = req.body.Tags
      return Tag.resolveByNames(tagNames)
        .then(function (tags) {
          return new Promise(function (resolve, reject) {
            thing.setTags(tags)
              .then(function () {
                resolve()
              })
          })
          .then(function () {
            var plainThing = thing.get()
            plainThing.Tags = tags
            res.json(plainThing)
          })
        })
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
})

router.put('/:id', jwtAuth, function (req, res) {
  Thing
    .findById(req.params.id)
    .then(function (thing) {
      if (thing == null) return res.status(404).send({message: 'Not Found'})
      return new Promise(function (resolve, reject) {
        thing.update(req.body).then(function () {resolve(thing)})
      })
    })
    .then(function (thing) {
      var tagNames = req.body.Tags
      return Tag.resolveByNames(tagNames)
        .then(function (tags) {
          return new Promise(function (resolve, reject) {
            thing.setTags(tags)
              .then(function () {
                resolve()
              })
          })
          .then(function () {
            var plainThing = thing.get()
            plainThing.Tags = tags
            res.json(plainThing)
          })
        })
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
})

router.delete('/:id', jwtAuth, function (req, res) {
  Thing
    .findById(req.params.id)
    .then(function (thing) {
      if (thing == null) return res.status(404).send({message: 'Not Found'})
      thing.destroy().then(function () {
        return res.json({code:200, message:'YOLO'})
      })
    })
})

module.exports = router
