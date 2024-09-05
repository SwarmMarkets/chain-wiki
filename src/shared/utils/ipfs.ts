import { initialVoteProposal } from './../consts/ipfs/vote-proposal'
import {
  IpfsTokenContent,
  IpfsAttestationContent,
  IpfsNftContent,
  IpfsIndexPagesContent,
} from '../types/ipfs'
import { VoteProposal } from '../types/vote-proposal'
import { isObject } from './isObject'

const initialNftContent: IpfsNftContent = {
  address: '',
  htmlContent: '',
}

const initialAttestationContent: IpfsAttestationContent = {
  htmlContent: '',
}

const initialIndexPagesContent: IpfsIndexPagesContent = {
  address: '',
  indexPages: [],
}

export const generateIpfsNftContent = (args: IpfsNftContent) => {
  const content: IpfsNftContent = {
    address: args.address,
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const generateIpfsTokenContent = (args: IpfsTokenContent) => {
  const content: IpfsTokenContent = {
    tokenId: args.tokenId,
    address: args.address,
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const generateIpfsAttestationContent = (
  args: IpfsAttestationContent
) => {
  const content: IpfsAttestationContent = {
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const generateIpfsIndexPagesContent = (args: IpfsIndexPagesContent) => {
  const content: IpfsIndexPagesContent = {
    indexPages: args.indexPages,
    address: args.address,
  }

  return JSON.stringify(content)
}

export const verifyObjectKeys = <T extends object>(
  keys: string[],
  object: T = {} as T
) => {
  const isObjValid = keys.every(key => Object.keys(object).includes(key))
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

  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i]
    const validValue = validObject[key]
    const checkValue = checkObject[key]

    verifyObjectKeys(validKeys, checkObject)

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

export const verifyNftValid = (content: IpfsNftContent) => {
  try {
    return verifyObjectKeysDeep(initialNftContent, content)
  } catch {
    throw Error('Nft content is invalid.')
  }
}

export const verifyAttestationValid = (attestation: IpfsAttestationContent) => {
  try {
    return verifyObjectKeysDeep(initialAttestationContent, attestation)
  } catch {
    throw Error('Attestation content is invalid.')
  }
}
export const verifyIndexPagesValid = (content: IpfsIndexPagesContent) => {
  try {
    return verifyObjectKeysDeep(initialIndexPagesContent, content)
  } catch {
    throw Error('Attestation content is invalid.')
  }
}
export const parseIpfsNftContent = (content: string): IpfsNftContent => {
  try {
    const parsedContent = JSON.parse(content)
    const validKeys = Object.keys(initialNftContent)
    verifyObjectKeysDeep(validKeys, parsedContent)
    return parsedContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
