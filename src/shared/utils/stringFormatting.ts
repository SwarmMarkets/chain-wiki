export const limitString = (str: string, limit: number) =>
  str.length > limit ? str.substring(0, limit) + '...' : str

export const getTextContentFromHtml = (html: string) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || ''
}

export const generateSymbolFromString = (str: string) => {
  const words = str.split(' ')

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase()
  }

  return words
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
