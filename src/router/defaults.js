// not clue where to put otherwise
const head = (document, data = {}) => {
  const {
    title = ''
  } = data

  document.title = title
}

module.exports = { head }
