module.exports = file => file
  .replace(`${process.cwd()}/posts/`, '')
  .replace('.md', '.html')
