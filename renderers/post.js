const matter = require('gray-matter')
const marked = require('marked')
const { JSDOM } = require('jsdom')

const read = require('../read')
const link = require('./link')

module.exports = async path => {
  const post = await read(path)

  // get content and metadata
  const { content, data: meta } = matter(post.toString('utf8'))

  // generate markup for content
  const html = marked(content)
  
  const data = `<article>
    ${new JSDOM(html).serialize()}
  </article>`

  // add absolute url to metadata
  meta.link = link(path)

  return { data, meta }
}
