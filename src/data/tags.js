module.exports = posts => (
  posts
    .filter(meta => Array.isArray(meta.tags))
    .reduce((tags, meta) => {
      meta.tags.forEach(tag => {
        (tags[tag] = tags[tags] ?? []).push(meta)
      })

      return tags
    }, {})
)
