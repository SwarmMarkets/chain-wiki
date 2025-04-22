import {
  parseIpfsHeaderLinksContent,
  parseIpfsIndexPagesContent,
  parseIpfsNftContent,
} from 'src/shared/utils'
import { useQuery } from '@tanstack/react-query'
import { useStorage } from '@thirdweb-dev/react'

export const useIpfsNftContent = (ipfsUri?: string) => {
  const storage = useStorage()

  const { data, isLoading, ...rest } = useQuery({
    queryKey: ['ipfsNftContent', ipfsUri],
    queryFn: async () => {
      const res = await storage?.downloadJSON(ipfsUri!)
      return parseIpfsNftContent(res)
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(ipfsUri),
  })

  return {
    ipfsContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsHeaderLinks = (ipfsUri?: string) => {
  const storage = useStorage()

  const { data, isLoading, ...rest } = useQuery({
    queryKey: ['ipfsHeaderLinks', ipfsUri],
    queryFn: async () => {
      const res = await storage?.downloadJSON(ipfsUri!)
      return parseIpfsHeaderLinksContent(res)
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(ipfsUri),
  })

  return {
    headerLinksContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}

export const useIpfsIndexPages = (ipfsUri?: string) => {
  const storage = useStorage()

  const { data, isLoading, ...rest } = useQuery({
    queryKey: ['ipfsIndexPages', ipfsUri],
    queryFn: async () => {
      if (!ipfsUri) return
      const res = await storage?.downloadJSON(ipfsUri)
      return parseIpfsIndexPagesContent(res)
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  return {
    indexPagesContent: data,
    isLoading: ipfsUri ? isLoading : false,
    ...rest,
  }
}
