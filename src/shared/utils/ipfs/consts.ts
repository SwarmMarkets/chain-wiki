import {
  IpfsNftContent,
  IpfsAttestationContent,
  IpfsIndexPagesContent,
  IpfsHeaderLinksContent,
} from './types'

export const initialNftContent: IpfsNftContent = {
  address: '',
  htmlContent: '',
}

export const initialAttestationContent: IpfsAttestationContent = {
  htmlContent: '',
}

export const initialIndexPagesContent: IpfsIndexPagesContent = {
  address: '',
  indexPages: [],
}

export const initialHeaderLinks: IpfsHeaderLinksContent = {
  address: '',
  headerLinks: [],
}
