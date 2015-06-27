module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Tag.belongsToMany(models.Thing, {through: 'ThingTag'})
      },
      resolveByNames: function (names) {
        return Tag
          .findAll({
            where: {name: {$in: names}}
          })
          .then(function (tags) {
            var newTagNames = []
            names.forEach(function (name) {
              var tagExists = false
              for (var i in tags) {
                var tag = tags[i]
                if (tag.name === name) {
                  tagExists = true
                  break
                }
              }
              if (!tagExists) newTagNames.push(name)
            })

            return Tag
              .bulkCreate(newTagNames.map(function (name) {
                return {name: name}
              }))
              .then(function () {
                return new Promise(function (resolve) {
                  Tag.findAll({
                    where: {name: {$in: newTagNames}}
                  })
                    .then(function (newTags) {
                      resolve(tags.concat(newTags))
                    })
                })
              })
          })
      }
    }
  })

  return Tag
}
