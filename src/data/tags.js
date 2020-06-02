const posts = require('./posts')

module.exports = async metas => {
  if (!metas) {
    metas = await posts()
    metas = metas.map(({ meta }) => meta)
  }

  return metas
    .filter(meta => Array.isArray(meta.tags))
    .reduce((tags, meta) => {
      meta.tags.forEach(tag => {
        (tags[tag] = tags[tag] ?? []).push(meta)
      })
      
      return tags
    }, {})
}
