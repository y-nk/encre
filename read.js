const { readFile } = require('fs')

module.exports = async path => new Promise((resolve, reject) => {
  readFile(path, (err, data) => {
    if (err)
      reject(err)

    resolve(data.toString('utf-8'))
  })
})
