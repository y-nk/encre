module.exports = ({ title, description, timestamp } = {}) => {
  let hgroup = ''

  if (title)
    hgroup += `<h2>${title}</h2>`

  if (description)
    hgroup += `<h3>${description}</h3>`

  if (timestamp)
    hgroup += `<h4>${new Date(timestamp).toISOString()}</h4>`

  return !!hgroup.length
    ? `<hgroup>${hgroup}</hgroup>`
    : ''
}
