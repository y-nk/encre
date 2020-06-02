const layout = require('../layout')
const fetch = require('../data/tags')

// default renderer
const { fallback: tag } = require('./tag')

const fallback = tags => {
  const list = Object.entries(tags)
    /*
      there's a weird bug with JSOM.
      if we write links as "tags/${k}.html" (without ./)
      they don't show up in the querySelectorAll later on...
    */
    .map(([k, v]) => (`
      <dt><a href="./tags/${k}.html">${k}</a></dt>
      <dd>${tag(v)}</dd>
    `))
    .join('')
  
  return `<dl>${list}</dl>`
}

// page renderer
const render = async (partial = fallback, head = undefined) => {
  const tags = await fetch()

  if (!tags)
    return null

  const dom = await layout('tags')
  const { document } = dom.window

  // mutate head
  if (head)
    head(document)

  // render
  document
    .getElementById('main')
    .innerHTML = await partial(tags)

  // fixing relative resources
  const REG = /^[\/|(http)]/i

  Array.from(document.querySelectorAll('*[href]'))
    .filter(node => !REG.test(node.getAttribute('href')))
    .forEach(node => {
      let href = node.getAttribute('href')

      if (href.startsWith('./'))
        href = `.${href}`
      else
        href = `../${href}`

      node.setAttribute('href', href)
    })

  return dom.serialize()
}

// express route
const route = async ({ encre }, res, next) => {
  const { head, tags } = encre

  const content = await render(tags, head)

  content
    ? res.send(content)
    : next()
}

// export
module.exports = { fallback, render, route }
