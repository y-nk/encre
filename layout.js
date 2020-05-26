const { JSDOM } = require('jsdom')
const read = require('./read')

module.exports = async () => {
  const index = await read(`${process.cwd()}/static/index.html`)
  return new JSDOM(index)
}
