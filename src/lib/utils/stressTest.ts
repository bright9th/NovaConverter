const CHARSET =
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  `.:,;'"(!?)+-*/=`

export function generateStressTest(length = 5000) {
  let result = ''

  for (let i = 0; i < length; i++) {
    const index = Math.floor(
      Math.random() * CHARSET.length
    )

    result += CHARSET[index]

    // occasional spacing
    if (Math.random() > 0.88) {
      result += ' '
    }

    // occasional newline
    if (Math.random() > 0.97) {
      result += '\n'
    }
  }

  return result
}