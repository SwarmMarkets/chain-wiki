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
          const response = await storageDownload({
            client: thirdwebClient,
            uri,
          })
          const parsedData = response.json()
          return parsedData as T
        }
      : undefined,
    enabled: !!uri && enabled,
    staleTime: Infinity,
    retry: false,
  })

  const download = async <U extends T>(targetUri: string): Promise<U> => {
    const cached = queryClient.getQueryData<U>(['ipfs-download', targetUri])
    if (cached) return cached

    const response = await storageDownload({
      client: thirdwebClient,
      uri: targetUri,
    })
    const parsedData = response.json()

    queryClient.setQueryData(['ipfs-download', targetUri], parsedData)

    return parsedData as U
  }

  return {
    ...query,
    download,
  }
}
