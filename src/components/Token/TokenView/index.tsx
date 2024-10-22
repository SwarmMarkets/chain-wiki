import { TokenQueryFullData } from '@src/shared/utils/ipfs/types'
import { TokenView } from './TokenView'

export interface TokenViewProps {
  token?: TokenQueryFullData | null
  onMount: (element: HTMLDivElement) => void
  onClickEditSite: () => void
}

export default TokenView
