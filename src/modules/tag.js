const layout = require('../layout')
const fetch = require('../data/tags')

const { quickTag } = require('../dom')

// default renderer
const fallback = (posts, slug) => {
  const list = posts
    .map(({ link, title }) => `<li><a href="${link}">${title}</a></li>`)
    .join('')
    
  const title = quickTag('h2', slug)
  
  return `
    ${title}
    <ul>${list}</ul>
  `
}

// page renderer
const render = async (slug, partial = fallback, head = undefined) => {
  const tags = await fetch()
  const tag = tags[slug]

  if (!tag)
    return null

  const dom = await layout('tag')
  const { document } = dom.window

  // mutate head
  if (head)
    head(document)

  // render
  document
    .getElementById('main')
    .innerHTML = await partial(tag, slug)

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
const route = async ({ params, encre }, res, next) => {
  const { name } = params
  const { head, tag } = encre

  const content = await render(name.replace('.html', ''), tag, head)

  content
    ? res.send(content)
    : next()
}

// export
module.exports = { fallback, render, route }
