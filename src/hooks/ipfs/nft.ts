import { useIpfsDownload } from '../web3/useIpfsDownload'

export const useIpfsNftContent = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload({ uri: ipfsUri || '' })

  return {
    ipfsContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsHeaderLinks = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload({ uri: ipfsUri || '' })

  return {
    headerLinksContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsIndexPages = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload({ uri: ipfsUri || '' })

  return {
    indexPagesContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}
