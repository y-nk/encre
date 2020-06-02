module.exports = posts => {
  const list = posts
    .map(({ link, title }) => `<li><a href="${link}">${title}</a></li>`)
    .join('')
    
  return `<ul>${list}</ul>`
}
