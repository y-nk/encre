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

module.exports = (req, res, next) => {
  const { path } = req

  const extension = Object.keys(mimetypes)
    .find(extension => path.endsWith(extension))
    
  if (extension)
    res.header('Content-Type', mimetypes[extension])

  next()
}
