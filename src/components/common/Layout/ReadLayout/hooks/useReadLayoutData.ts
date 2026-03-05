'use client'

import { useCallback, useMemo } from 'react'
import { allNetworks } from 'src/environment/networks'
import useTokens from 'src/hooks/subgraph/useTokens'
import { createClientForChain } from 'src/services/apollo'
import { ChainParam, chainParamResolver } from 'src/shared/consts/routes'
import {
  NFTWithMetadata,
  TokensQueryFullData,
  unifyAddressToId,
} from 'src/shared/utils'
import { buildTree } from '../utils'

interface UseReadLayoutDataProps {
  chain?: ChainParam
  nft: NFTWithMetadata | null
  preview?: boolean
  fullTokens: TokensQueryFullData[] | null
  initialSelectedToken?: TokensQueryFullData | null
  resolvedTokenSlugOrId?: string
}

const useReadLayoutData = ({
  chain,
  nft,
  preview,
  fullTokens,
  initialSelectedToken,
  resolvedTokenSlugOrId,
}: UseReadLayoutDataProps) => {
  const chainClient = useMemo(() => {
    if (!chain) return null
    const chainName = chainParamResolver[chain]
    const resolvedChain = allNetworks.find(
      network => network.name?.toLowerCase() === chainName?.toLowerCase()
    )
    if (!resolvedChain) return null
    return createClientForChain(resolvedChain.id)
  }, [chain])

  const { fullTokens: clientFullTokens } = useTokens(
    {
      client: chainClient || undefined,
      variables: nft?.id
        ? {
            filter: { nft: unifyAddressToId(nft.id) },
          }
        : undefined,
      skip: preview || !nft?.id || !chainClient,
    },
    { fetchFullData: true }
  )

  const resolvedFullTokens = useMemo(() => {
    if (clientFullTokens) return clientFullTokens
    if (fullTokens) return fullTokens
    if (initialSelectedToken) return [initialSelectedToken]
    return null
  }, [clientFullTokens, fullTokens, initialSelectedToken])

  const normalizedResolvedTokenSlugOrId = resolvedTokenSlugOrId?.toLowerCase()

  const isTokenMatch = useCallback(
    (token?: TokensQueryFullData | null) => {
      if (!token || !resolvedTokenSlugOrId || !normalizedResolvedTokenSlugOrId) {
        return false
      }

      return (
        token.slug === resolvedTokenSlugOrId ||
        token.id.toLowerCase() === normalizedResolvedTokenSlugOrId
      )
    },
    [normalizedResolvedTokenSlugOrId, resolvedTokenSlugOrId]
  )

  const selectedToken = useMemo(() => {
    if (!resolvedTokenSlugOrId) return initialSelectedToken || null

    const fromFull = resolvedFullTokens?.find(isTokenMatch)
    if (fromFull) return fromFull

    return isTokenMatch(initialSelectedToken) ? initialSelectedToken : null
  }, [
    initialSelectedToken,
    isTokenMatch,
    resolvedFullTokens,
    resolvedTokenSlugOrId,
  ])

  const treeData = useMemo(() => {
    if (!nft?.indexPagesContent?.indexPages) return []
    return buildTree(
      nft.indexPagesContent.indexPages,
      nft.slug,
      0,
      chain,
      resolvedFullTokens
    )
  }, [chain, nft?.indexPagesContent?.indexPages, nft?.slug, resolvedFullTokens])

  return {
    resolvedFullTokens,
    selectedToken,
    treeData,
  }
}

export default useReadLayoutData
