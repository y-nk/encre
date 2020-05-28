const { JSDOM } = require('jsdom')
const read = require('./read')
const has = require('./has')

const static = file => (
  `${process.cwd()}/static/${file}.html`
)

module.exports = async (layout = 'index') => {
  const file = await has(static(layout)) ? static(layout) : static('index')
  const index = await read(file)
  return new JSDOM(index)
}
