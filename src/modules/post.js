const { html2md } = require('../convert')
const layout  = require('../layout')
const fetch   = require('../data/post')

// default renderer
const fallback = ({ title, description, timestamp } = {}) => {
  let hgroup = ''

  if (title)
    hgroup += `<h2>${title}</h2>`

  if (description)
    hgroup += `<h3>${description}</h3>`

  if (timestamp) {
    const date = new Date(timestamp)
    const chunks = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
    hgroup += `<h6>${chunks.join('/')}</h6>`
  }

  return !!hgroup.length
    ? `<hgroup>${hgroup}</hgroup>`
    : ''
}

// page renderer
const render = async (file, partial = fallback, head = undefined) => {
  const { meta, data } = await fetch(file)
  
  const dom = await layout(meta?.layout ?? 'post')
  const { document } = dom.window

  // mutate head
  if (head)
    head(document, meta)

  // render
  document
    .getElementById('main')
    .innerHTML = `${partial(meta)} ${data}`

  return dom.serialize()
}

// express route
const route = async ({ path, encre }, res, next) => {
  const file = await html2md(path)

  if (!file)
    return next()

  const { head, title } = encre

  const content = await render(file, title, head)
  res.send(content)
}

// export
module.exports = { render, route }
