const render = require('./render')

const mimetypes = {
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.otf': 'text/plain',
}

module.exports = options => async (req, res) => {
  const { path } = req

  const content = await render(path, options)

  const extension = Object.keys(mimetypes)
    .find(extension => path.endsWith(extension))
    
  if (content && extension)
    res.header('Content-Type', mimetypes[extension])

  if (content)
    res.status(200).end(content)
  else
    res.status(404).end()
}
