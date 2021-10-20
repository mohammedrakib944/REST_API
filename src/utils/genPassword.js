exports.genPassword = () => {
  return `bp${Math.floor(100000 + Math.random() * 900000)}`
}
