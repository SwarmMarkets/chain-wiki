import { IpfsArticleContent, IpfsProjectContent } from '../types/ipfs'

const initialProjectContent = {
  name: '',
  address: '',
  htmlContent: '',
}

// const initialArticleContent = {
//   tokenId: 0,
//   ...initialProjectContent,
// }

export const generateIpfsProjectContent = (args: IpfsProjectContent) => {
  const content: IpfsProjectContent = {
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const generateIpfsArticleContent = (args: IpfsArticleContent) => {
  const content: IpfsArticleContent = {
    tokenId: args.tokenId,
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const verifyObjectKeys = <T extends object>(
  keys: string[],
  object: T = {} as T
) => {
  const isObjValid = Object.keys(object).every(key => keys.includes(key))
  if (!isObjValid) {
    throw Error('Keys does not satisfy Object keys')
  }
  return isObjValid
}

export const parseIpfsProjectContent = (
  content: string
): IpfsProjectContent => {
  try {
    const parsedContent = JSON.parse(content)
    const validKeys = Object.keys(initialProjectContent)
    verifyObjectKeys(validKeys, parsedContent)
    return parsedContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
