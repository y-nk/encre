const { promisify } = require('util')
const glob = promisify(require('glob'))

const post = require('./post')

module.exports = async () => {
  const paths = await glob(`${process.cwd()}/posts/**/*.md`)

  const posts = await Promise.all(
    paths.map(path => post(path))
  )
  
  return posts.map(({ meta }) => meta)
}
