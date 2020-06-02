const fetch  = require('../data/posts')

// node generation helper
const { quickTag } = require('../dom')

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
      ${ quickTag('id', post.link) }
      ${ quickTag('title', post.title) }
      ${ quickTag('summary', post.description) }
      ${ quickTag('link', `${website.url}${post.link}`) }
      ${ quickTag('updated', new Date(post.timestamp).toISOString()) }
    </entry>`))
    .join('\n')


  const categories = website.categories?.map(term => (`
    <category term="${term}" />
  `)).join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
  
    ${ quickTag('id', website.url) }
    ${ quickTag('title', website.title) }
    ${ quickTag('subtitle', website.subtitle) }
    ${ quickTag('rights', website.rights) }
  
    ${ quickTag('logo', website.logo) }
    ${ quickTag('icon', website.icon) }
  
    ${ quickTag('updated', updated) }
  
    <author>
      ${ quickTag('name', website.author) }
      ${ quickTag('email', website.email) }
      ${ quickTag('uri', website.uri) }
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
