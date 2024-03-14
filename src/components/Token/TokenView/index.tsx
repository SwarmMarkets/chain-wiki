import { TokenQueryFullData } from '@src/shared/types/ipfs'
import { TokenView } from './TokenView'

export interface TokenViewProps {
  article?: TokenQueryFullData | null
  onMount: (element: HTMLDivElement) => void
}

export default TokenView
