module.exports = ({ title, description, timestamp } = {}) => {
  let hgroup = ''

  if (title)
    hgroup += `<h2>${title}</h2>`

  if (description)
    hgroup += `<h3>${description}</h3>`

  if (timestamp) {
    const date = new Date(timestamp)
    const chunks = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
    hgroup += `<h6>${chunks.join('/')}</h6>`
  }

  return !!hgroup.length
    ? `<hgroup>${hgroup}</hgroup>`
    : ''
}
