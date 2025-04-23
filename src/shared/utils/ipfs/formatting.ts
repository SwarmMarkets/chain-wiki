export const ipfsToHttp = (ipfsUrl: string) => {
  return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
