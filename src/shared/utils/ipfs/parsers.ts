import { verifyObjectKeysDeep } from '../json'
import {
  initialHeaderLinks,
  initialIndexPagesContent,
  initialNftContent,
} from './consts'
import {
  IpfsHeaderLinksContent,
  IpfsIndexPagesContent,
  IpfsNftContent,
} from './types'

export const parseIpfsNftContent = (content: object): IpfsNftContent => {
  try {
    verifyObjectKeysDeep(initialNftContent, content)
    return content as IpfsNftContent
  } catch {
    throw Error('Invalid JSON format')
  }
}

export const parseIpfsHeaderLinksContent = (
  content: object
): IpfsHeaderLinksContent => {
  try {
    verifyObjectKeysDeep(initialHeaderLinks, content)
    return content as IpfsHeaderLinksContent
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
