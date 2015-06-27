var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('yolo')
})

module.exports = router
