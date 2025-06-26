import {
  IpfsHeaderLinksContent,
  IpfsIndexPagesContent,
  IpfsNftContent,
} from 'src/shared/utils'
import { useIpfsDownload } from '../web3/useIpfsDownload'

export const useIpfsNftContent = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload<IpfsNftContent>({
    uri: ipfsUri || '',
  })

  return {
    ipfsContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsHeaderLinks = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload<IpfsHeaderLinksContent>({
    uri: ipfsUri || '',
  })

  return {
    headerLinksContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsIndexPages = (ipfsUri?: string) => {
  const { data, isLoading, ...rest } = useIpfsDownload<IpfsIndexPagesContent>({
    uri: ipfsUri || '',
  })

  return {
    indexPagesContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}
