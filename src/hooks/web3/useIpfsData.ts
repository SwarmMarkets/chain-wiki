'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useIpfsDownload } from './useIpfsDownload'

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
  const [mappedData, setMappedData] = useState<Mapping<T>>(new Map())
  const immediateOnce = useRef<boolean>(immediate)
  const { download } = useIpfsDownload()

  const getBatchIpfsData = useCallback(
    async (uris: string[]) => {
      setLoading(true)
      const results: T[] = []
      const map = new Map<string, T>()

      const promises = uris.map(async uri => {
        try {
          const res = (await download(uri)) as T
          validator(res)
          results.push(res)
          if (mapping) {
            const key = mapping(res)
            map.set(key, res)
          }
          return res
        } catch (e) {
          console.error('IPFS download error for', uri, e)
          return null
        }
      })

      await Promise.all(promises)
      setData(results)
      setMappedData(map)
      setLoading(false)

      return { results, mappedResults: map }
    },
    [download, mapping, validator]
  )

  useEffect(() => {
    if (immediateOnce.current) {
      getBatchIpfsData(ipfsUris)
      immediateOnce.current = false
    }
  }, [getBatchIpfsData, ipfsUris])

  return { data, mappedData, loading, fetch: getBatchIpfsData }
}

export default useIpfsData
