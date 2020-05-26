module.exports = async (document, posts) => {
  const ul = document.createElement('ul')

  posts.forEach(post => {
    const a = document.createElement('a')
      a.textContent = post.title
      a.href = post.link
      
    const li = document.createElement('li')
      li.appendChild(a)
      ul.appendChild(li)
  })

  return ul.outerHTML
}
