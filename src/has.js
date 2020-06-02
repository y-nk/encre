const { stat } = require('fs')

module.exports = path => new Promise(resolve => {
  stat(path, (err, stats) => resolve(!err && stats.isFile()))
})
