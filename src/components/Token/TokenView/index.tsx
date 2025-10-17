'use client'

import { TokenQueryFullData } from 'src/shared/utils/ipfs/types'
import { TokenView } from './TokenView'

export interface TokenViewProps {
  token?: TokenQueryFullData | null
  onClickEditSite: () => void
}

export default TokenView
