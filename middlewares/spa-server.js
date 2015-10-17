var path = require('path')
var _ = require('lodash')

var ignoreExt = ['html', 'js', 'css', 'jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'map']

module.exports = function (htmlPath) {
  return function (req, res, next) {
    if (isSendPage(req.path)) {
      res.sendFile(htmlPath)
    } else {
      next()
    }
  }
}

function isSendPage (reqPath) {
  var extPattern = _.map(ignoreExt, function (ext) {
    return '(' + ext + ')'
  }).join('|')
  var pattern = new RegExp('^/api|\.(' + extPattern + ')$', 'i')

  return !pattern.test(reqPath)
}
