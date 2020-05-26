const { F_OK, access } = require('fs')

module.exports = file => new Promise(resolve => {
  access(file, F_OK, err => resolve(!err))
})
