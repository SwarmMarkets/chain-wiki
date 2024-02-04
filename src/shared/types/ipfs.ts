interface IpfsProjectContent {
  name: string
  address: string
  htmlContent: string
}

interface IpfsArticleContent {
  name: string
  address: string
  tokenId: string
  htmlContent: string
}

export type {
  IpfsProjectContent,
  IpfsArticleContent
}