const has = require('./has')

module.exports.html2md = async path => {
  const file = `${process.cwd()}/posts/${path.replace('.html', '.md')}`

  if (await has(file))
    return file
}

module.exports.md2html = file => file
  .replace(`${process.cwd()}/posts/`, '')
  .replace('.md', '.html')
