import { verifyObjectKeysDeep } from '../json'
import { initialIndexPagesContent, initialNftContent } from './consts'
import { IpfsIndexPagesContent, IpfsNftContent } from './types'

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

export const parseIpfsIndexPagesContent = (
  content: string
): IpfsIndexPagesContent => {
  try {
    const parsedContent = JSON.parse(content)
    const validKeys = Object.keys(initialIndexPagesContent)
    verifyObjectKeysDeep(validKeys, parsedContent)
    return parsedContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
