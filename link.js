module.exports = file => {
  return file
    .replace(`${process.cwd()}/posts/`, '')
    .replace('.md', '.html')
}
    