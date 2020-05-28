module.exports = async (document, posts) => {
  const ul = document.createElement('ul')

  posts.forEach(({ meta }) => {
    const a = document.createElement('a')
      a.textContent = meta.title
      a.href = meta.link
      
    const li = document.createElement('li')
      li.appendChild(a)
      ul.appendChild(li)
  })

  return ul.outerHTML
}
