var env = process.env
var moment = require('moment')

var express = require('express')
var router = express.Router()

var models = require('../models')
var Account = models.Account

var jwt = require('jwt-simple')
var jwtAuth = require('../middlewares/jwt-auth')
var createJWT = function (user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(env.TOKEN_EXP, 's').unix()
  }
  return jwt.encode(payload, env.TOKEN_SECRET)
}

router.get('/', function (req, res) {
  res.send({
    name: 'Auth API'
  })
})

router.get('/user', jwtAuth, function (req, res) {
  Account.findById(req.user).then(function (user) {
    res.json(user)
  })
})

router.post('/signup', function (req, res) {
  Account.create({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function (user) {
      res.json({token: createJWT(user)})
    })
    .catch(function (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send(err)
      }
      res.status(500).send(err)
    })
})

router.post('/login', function (req, res) {
  Account.findOne({
    where: {email: req.body.email}
  })
    .then(function (user) {
      if (user == null || !user.comparePassword(req.body.password)) {
        return res.status(401).send({message: 'Wrong email and/or password'})
      }
      res.json({
        token: createJWT(user)
      })
    })
})

var request = require('request')

router.post('/facebook', function (req, res) {
  var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token'
  var graphApiUrl = 'https://graph.facebook.com/v2.3/me'
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FB_SECRET,
    redirect_uri: req.body.redirectUri
  }

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message })
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message })
      }
      console.log('profile', profile)
      if (req.headers.authorization) {
        Account.findOne({where: { fbId: profile.id }})
          .then(function (existingUser) {
            if (existingUser) {
              return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' })
            }
            var token = req.headers.authorization.split(' ')[1]
            var payload = jwt.decode(token, process.env.TOKEN_SECRET)
            Account.findById(payload.sub)
              .then(function (account) {
                if (!account) {
                  return res.status(400).send({ message: 'Account not found' })
                }
                account.fbId = profile.id
                account.username = account.username || profile.name
                account.save(function () {
                  var token = createJWT(account)
                  res.send({ token: token })
                })
              })
          })
      } else {
        // Step 3b. Create a new user account or return an existing one.
        Account.findOne({ where: {fbId: profile.id} }).then(function (existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser)
            return res.send({ token: token })
          }
          Account.create({
            username: profile.first_name + profile.last_name,
            email: profile.email,
            fbId: profile.id
          })
            .then(function (user) {
              res.json({token: createJWT(user)})
            })
            .catch(function (err) {
              if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).send(err)
              }
              res.status(500).send(err)
            })
        })
      }
    })
  })
})

module.exports = router
