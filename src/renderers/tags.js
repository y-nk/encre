const tag = require('./tag')

module.exports = tags => {
  console.log(tags)
  
  const list = Object.entries(tags)
    .map(([k, v]) => (`
      <dt><a href="tags/${k}.html">${k}</a></dt>
      <dd>${tag(v)}</dd>
    `))
    .join('')
    
  return `<dl>${list}</dl>`
}
