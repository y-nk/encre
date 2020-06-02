module.exports = (document, data = {}) => {
  const {
    title = ''
  } = data

  document.title = title
}
