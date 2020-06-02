const { promisify } = require('util')
const glob = promisify(require('glob'))

const post = require('./renderers/post')

module.exports = async () => {
  const paths = await glob(`${process.cwd()}/posts/**/*.md`)

  return await Promise.all(
    paths.map(path => post(path))
  )
}
