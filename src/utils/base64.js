const CODE_EXPRESSION = /%([0-9A-F]{2})/g

const btoa = (text) => {
  return Buffer.from(text, 'binary').toString('base64')
}

const atob = (base64) => {
  return Buffer.from(base64, 'base64').toString('binary')
}

const getChar = (part, hex) => {
  return String.fromCharCode(parseInt(hex, 16))
}

const encodeUnicode = (text) => {
  const safeText = encodeURIComponent(text)
  return safeText.replace(CODE_EXPRESSION, getChar)
}

const decodeUnicode = (text) => {
  let result = ''
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i)
    result += '%'
    if (code < 16) {
      result += '0'
    }
    result += code.toString(16)
  }
  return decodeURIComponent(result)
}

exports.Base64 = {
  encode: (text) => {
    return btoa(encodeUnicode(text))
  },
  decode: (base64) => {
    return decodeUnicode(atob(base64))
  },
}

// // Example:

// let s = Base64.encode('আমি বাংলোয় কথা বলি ')
// console.log(s)
// console.log(Base64.decode(s)); // This is text...
