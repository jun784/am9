var express = require('express')
var router = express.Router()

var models = require('../models')
var Resource = models.Resource

var jwtAuth = require('../middlewares/jwt-auth')

router.get('/', function (req, res) {
  Resource.findAll()
    .then(function (resources) {
      res.json(resources)
    })
})

router.post('/', jwtAuth, function (req, res) {
  Resource
    .create({
      name: req.body.name,
      fbId: req.body.fbId
    })
    .then(function (resource) {
      res.json(resource)
    })
})

router.get('/:id', jwtAuth, function (req, res) {
  Resource.findById(req.params.id)
    .then(function (resource) {
      if (resource == null) return res.status(404).send({message: 'Not Found'})

      res.json(resource)
    })
})

router.put('/:id', jwtAuth, function (req, res) {
  Resource.findById(req.params.id)
    .then(function (resource) {
      if (resource == null) return res.status(404).send({message: 'Not Found'})
      return resource
        .update({
          name: req.body.name,
          fbId: req.body.fbId
        })
        .then(function () {
          res.json(resource)
        })
    })
})

router.delete('/:id', jwtAuth, function (req, res) {
  Resource.findById(req.params.id)
    .then(function (resource) {
      if (resource == null) return res.status(404).send({message: 'Not Found'})

      resource.destroy()
        .then(function () {
          res.json({status: 200, message: 'Yolo'})
        })
    })
})

module.exports = router
