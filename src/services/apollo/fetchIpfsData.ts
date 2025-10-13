import { thirdwebClient } from 'src/shared/api-clients/thirdweb'
import { download } from 'thirdweb/storage'

export type BatchIpfsOptions<T> = {
  validator?: (data: T) => void
  mapping?: (data: T) => string
}


export const fetchIpfsDataServer = async <T>(
  uris: string[],
  params?: BatchIpfsOptions<T>
): Promise<{ results: T[]; mappedResults: Map<string, T> }> => {
  const results: T[] = []
  const map = new Map<string, T>()
  const { validator, mapping } = params || {}

  const promises = uris.map(async uri => {
    try {
      const res = await download({ client: thirdwebClient, uri })
      const parsed = (await res.json()) as T
      if (validator) validator(parsed)
      results.push(parsed)

      if (mapping) {
        const key = mapping(parsed)
        map.set(key, parsed)
      }

      return res
    } catch (e) {
      console.error('IPFS download error for', uri, e)
      return null
    }
  })

  await Promise.all(promises)

  return { results, mappedResults: map }
}
