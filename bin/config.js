const { argv } = process

const args = argv.slice(2)
const file = args.shift()

module.exports = file
  ? require(`${process.cwd()}/${file}`)
  : {}
  