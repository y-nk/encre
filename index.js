const { createElement } = require('./dom')

module.exports = async posts => {
  const ul = createElement('ul')

  posts.forEach(({ meta }) => {
    const a = createElement('a')
      a.textContent = meta.title
      a.href = meta.link
      
    const li = createElement('li')
      li.appendChild(a)
      ul.appendChild(li)
  })

  return ul.outerHTML
}
