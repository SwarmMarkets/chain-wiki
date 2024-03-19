import { useStorage } from '@thirdweb-dev/react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Key = string
type Mapping<T> = Map<Key, T>

interface UseIpfsDataOptions<T> {
  ipfsUris?: string[]
  validator(content: T): boolean | never
  mapping?(content: T): Key
  immediate?: boolean
}

const useIpfsData = <T extends object>({
  ipfsUris = [],
  validator,
  mapping,
  immediate = false,
}: UseIpfsDataOptions<T>) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T[]>([])
  const [mappedData, setMappedData] = useState<Mapping<T>>()
  const immediateOnce = useRef<boolean>(immediate)

  const storage = useStorage()

  const getBatchIpfsData = useCallback(
    async (uris: string[]) => {
      const results: T[] = []
      const mappedResults = new Map<string, T>()

      const promises = uris.map(uri =>
        storage
          ?.downloadJSON(uri)
          .then(res => {
            validator(res)
            results.push(res)

            if (mapping) {
              const id = mapping(res)
              mappedResults.set(id, res)
            }
            return res
          })
          .catch(e => e)
      )

      try {
        setLoading(true)
        await Promise.all(promises)
        setData(results)
        setMappedData(mappedResults)
      } finally {
        setLoading(false)
      }

      return { results, mappedResults }
    },
    [mapping, storage, validator]
  )

  useEffect(() => {
    if (immediateOnce.current) {
      getBatchIpfsData(ipfsUris)
      immediateOnce.current = true
    }
  }, [getBatchIpfsData, ipfsUris])

  return {
    data,
    mappedData,
    loading,
    fetch: getBatchIpfsData,
  }
}

export default useIpfsData
