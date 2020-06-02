const layout = require('../layout')
const fetch  = require('../data/posts')

// default renderer
const fallback = posts => {
  const list = posts
    .map(({ link, title }) => `<li><a href="${link}">${title}</a></li>`)
    .join('')
    
  return `<ul>${list}</ul>`
}

// page renderer
const render = async (partial = fallback, head = undefined) => {
  const posts = await fetch()
  const metas = posts.map(({ meta }) => meta)

  const dom = await layout()
  const { document } = dom.window

  // mutate head
  if (head)
    head(document)

  // render
  document
    .getElementById('main')
    .innerHTML = await partial(metas)

  return dom.serialize()
}

// express route
const route = async ({ encre }, res) => {
  const { head, index } = encre

  const content = await render(index, head)
  res.send(content)
}

// export
module.exports = { render, route }
