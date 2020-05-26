const render = require('./render')

module.exports = options => async (req, res) => {
  const { path } = req

  const content = await render(path, options)

  if (content)
    res.status(200).end(content)
  else
    res.status(404).end()
}
