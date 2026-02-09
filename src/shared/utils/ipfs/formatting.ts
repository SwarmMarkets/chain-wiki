const thirdwebGateway = 'https://ipfs.thirdwebstorage.com/ipfs/'
const thirdwebClientGateway = (clientId?: string) =>
  clientId ? `https://${clientId}.ipfscdn.io/ipfs/` : thirdwebGateway

export const ipfsToHttp = (ipfsUrl: string) => {
  const clientGateway = thirdwebClientGateway(
    process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID
  )

  return ipfsUrl
    .replace('ipfs://', clientGateway)
    .replace('https://ipfs.io/ipfs/', clientGateway)
    .replace(thirdwebGateway, clientGateway)
}
