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
  content: object
): IpfsIndexPagesContent => {
  try {
    verifyObjectKeysDeep(initialIndexPagesContent, content)
    return content as IpfsIndexPagesContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
