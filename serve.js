const render = require('./render')

const mimetypes = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mpeg',
  '.otf': 'text/plain',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.html': 'text/html',
  '.json': 'application/json',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
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
