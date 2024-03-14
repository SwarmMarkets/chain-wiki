export const limitString = (str: string, limit: number) =>
  str.length > limit ? str.substring(0, limit) + '...' : str

export const getTextContentFromHtml = (html: string) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || ''
}

export const generateSymbolFromString = (str: string) => {
  return str
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
