import {
  parseIpfsHeaderLinksContent,
  parseIpfsNftContent,
} from '@src/shared/utils'
import { useQuery } from '@tanstack/react-query'
import { useStorage } from '@thirdweb-dev/react'

export const useIpfsNftContent = (ipfsUri?: string) => {
  const storage = useStorage()

  const { data, ...rest } = useQuery({
    queryKey: ['ipfsNftContent', ipfsUri],
    queryFn: async () => {
      const res = await storage?.downloadJSON(ipfsUri!)
      console.log('useIpfsNftContent', ipfsUri, res)
      return parseIpfsNftContent(res)
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(ipfsUri),
  })

  return {
    ipfsContent: data,
    ...rest,
  }
}

export const useIpfsHeaderLinksContent = (ipfsUri?: string) => {
  const storage = useStorage()

  const { data, ...rest } = useQuery({
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
    headerLinks: data?.headerLinks,
    ...rest,
  }
}
