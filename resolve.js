const has = require('./has')

module.exports = async path => {
  const file = `${process.cwd()}/posts/${path.replace('.html', '.md')}`

  if (await has(file))
    return file
}
