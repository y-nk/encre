const fetch  = require('../data/posts')

// node generation helper
const node = (node, data) => (data ? `<${node}>${data}</${node}>` : '')

// page renderer
const render = async (website = {}) => {
  const posts = await fetch()

  // only get posts with timestamp
  const stamped = posts
    .map(({ meta }) => meta)
    .filter(post => !isNaN(post.timestamp))    
    .sort((a, b) => b.timestamp - a.timestamp) 

  const updated = stamped[0]
    ? new Date(stamped[0].timestamp).toISOString()
    : null
    
  const entries = stamped
    .map(post => (`<entry>
      ${ node('id', post.link) }
      ${ node('title', post.title) }
      ${ node('summary', post.description) }
      ${ node('link', `${website.url}${post.link}`) }
      ${ node('updated', new Date(post.timestamp).toISOString()) }
    </entry>`))
    .join('\n')


    const categories = website.categories?.map(term => (`
    <category term="${term}" />
  `)).join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
  
    ${ node('id', website.url) }
    ${ node('title', website.title) }
    ${ node('subtitle', website.subtitle) }
    ${ node('rights', website.rights) }
  
    ${ node('logo', website.logo) }
    ${ node('icon', website.icon) }
  
    ${ node('updated', updated) }
  
    <author>
      ${ node('name', website.author) }
      ${ node('email', website.email) }
      ${ node('uri', website.uri) }
    </author>
  
    ${categories}
    ${entries}
  </feed>`
}

// express route
const route = async ({ encre }, res) => {
  const { metadata } = encre

  const content = await render(metadata)
  res.send(content)
}

// export
module.exports = { render, route }
