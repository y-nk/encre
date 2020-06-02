const { JSDOM } = require('jsdom')
const { document } = new JSDOM('').window

// exposing "createElement"
module.exports.createElement = document.createElement.bind(document)

// exposing shorthand helper
module.exports.generateTag = (tag, { _, ...rest } = {}, complete = false) => {
  const attributes = Object.entries(rest)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')

  return _ || complete
    ? `<${tag}${' ' + attributes}>${_}</${tag}>`
    : `<${tag}${' ' + attributes} />`
}
