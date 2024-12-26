import {
  IpfsAttestationContent,
  IpfsHeaderLinksContent,
  IpfsIndexPagesContent,
  IpfsNftContent,
  IpfsTokenContent,
} from './types'

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

export const generateIpfsHeaderLinksContent = (
  args: IpfsHeaderLinksContent
) => {
  const content = {
    headerLinks: args.headerLinks,
    address: args.address,
    color: args.color,
  }

  return JSON.stringify(content)
}
