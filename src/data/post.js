const matter = require('gray-matter')
const marked = require('marked')
const { JSDOM } = require('jsdom')

const read = require('../read')
const { md2html } = require('../convert')

module.exports = async path => {
  const post = await read(path)

  // get content and metadata
  const { content, data: dump } = matter(post.toString('utf8'))

  // gray-matter has a cache system we want to avoid
  const meta = { ...dump }

  // generate markup for content
  const html = marked(content)
  
  const data = `<article>
    ${new JSDOM(html).serialize()}
  </article>`

  // transform tags into array
  if (meta.tags)
    meta.tags = meta.tags
      .split(',')
      .map(tag => tag.trim())
      .map(tag => tag.toLowerCase())

  // add absolute url to metadata
  meta.link = md2html(path)

  return { data, meta }
}
