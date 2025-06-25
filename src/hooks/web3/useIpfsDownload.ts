import { useQuery } from '@tanstack/react-query'
import { download } from 'thirdweb/storage'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'

interface UseIpfsDownloadOptions {
  uri: string
  enabled?: boolean
}

export function useIpfsDownload<T>({
  uri,
  enabled = true,
}: UseIpfsDownloadOptions) {
  return useQuery<T>({
    queryKey: ['ipfs-download', uri],
    queryFn: async () => {
      const result = await download({ client: thirdwebClient, uri })
      return result as T
    },
    enabled: !!uri && enabled,
    staleTime: Infinity,
    retry: false,
  })
}
