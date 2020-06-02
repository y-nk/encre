const { JSDOM } = require('jsdom')
const { document } = new JSDOM('').window

// exposing "createElement"
module.exports.createElement = document.createElement.bind(document)

// exposing shorthand helpers
module.exports.generateTag = (tag, { _, ...rest } = {}, complete = false) => {
  const attributes = Object.entries(rest)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')

  return _ || complete
    ? `<${tag}${' ' + attributes}>${_}</${tag}>`
    : `<${tag}${' ' + attributes} />`
}

module.exports.quickTag = (tag, inner, fallback) => (
  (inner || fallback)
    ? `<${tag}>${inner || fallback}</${tag}>`
    : null
)