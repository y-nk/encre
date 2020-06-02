const has = require('../has')
const read = require('../read')

module.exports = async (req, res, next) => {
  const { path } = req

  const files = ['static', 'posts']
    .map(directory => `${process.cwd()}/${directory}/${path}`)

  for (const file of files)
    if (await has(file)) {
      const data = await read(file)
      return res.send(data)
    }

  next()
}