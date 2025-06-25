import { useQuery, useQueryClient } from '@tanstack/react-query'
import { download as storageDownload } from 'thirdweb/storage'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'

interface UseIpfsDownloadOptions {
  uri?: string
  enabled?: boolean
}

export function useIpfsDownload<T>({
  uri,
  enabled = true,
}: UseIpfsDownloadOptions = {}) {
  const queryClient = useQueryClient()

  const query = useQuery<T>({
    queryKey: uri ? ['ipfs-download', uri] : [],
    queryFn: uri
      ? async () => {
          const result = await storageDownload({ client: thirdwebClient, uri })
          return result as T
        }
      : undefined,
    enabled: !!uri && enabled,
    staleTime: Infinity,
    retry: false,
  })

  const download = async <U extends T>(targetUri: string): Promise<U> => {
    const cached = queryClient.getQueryData<U>(['ipfs-download', targetUri])
    if (cached) return cached

    const result = (await storageDownload({
      client: thirdwebClient,
      uri: targetUri,
    })) as U
    queryClient.setQueryData(['ipfs-download', targetUri], result)
    return result
  }

  return {
    ...query,
    download,
  }
}
