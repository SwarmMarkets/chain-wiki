import { initialVoteProposal } from './../consts/ipfs/vote-proposal'
import { IpfsArticleContent, IpfsProjectContent } from '../types/ipfs'
import { VoteProposal } from '../types/vote-proposal'
import { isObject } from './isObject'

const initialProjectContent: IpfsProjectContent = {
  name: '',
  address: '',
  htmlContent: '',
  indexPages: [],
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
    indexPages: args.indexPages,
  }

  return JSON.stringify(content)
}

export const generateIpfsArticleContent = (args: IpfsArticleContent) => {
  const content: IpfsArticleContent = {
    tokenId: args.tokenId,
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
    voteProposal: args.voteProposal,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyObjectKeysDeep = <T extends { [key: string]: any }>(
  validObject: T,
  checkObject: T
): boolean => {
  const validKeys = Object.keys(validObject).sort()
  const checkKeys = Object.keys(checkObject).sort()

  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i]
    const validValue = validObject[key]
    const checkValue = checkObject[key]

    if (checkKeys[i] !== key) {
      throw Error('Object is invalid')
    }

    const areObjects = isObject(validValue) && isObject(checkValue)

    if (
      areObjects &&
      !verifyObjectKeysDeep(
        validValue as Record<string, unknown>,
        (checkValue as Record<string, unknown>) ||
          (!areObjects && validValue !== checkValue)
      )
    ) {
      throw Error('Object is invalid')
    }
  }

  return true
}

export const verifyVoteProposalValid = (proposal: VoteProposal) => {
  try {
    return verifyObjectKeysDeep(initialVoteProposal, proposal)
  } catch {
    throw Error('Proposal invalid. Please check your proposal content.')
  }
}

export const verifyProjectValid = (project: IpfsProjectContent) => {
  try {
    return verifyObjectKeysDeep(initialProjectContent, project)
  } catch {
    throw Error('Project content is invalid.')
  }
}

export const parseIpfsProjectContent = (
  content: string
): IpfsProjectContent => {
  try {
    const parsedContent = JSON.parse(content)
    const validKeys = Object.keys(initialProjectContent)
    verifyObjectKeysDeep(validKeys, parsedContent)
    return parsedContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
