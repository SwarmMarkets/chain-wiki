import { TokenQueryFullData } from '@src/shared/types/ipfs'
import { TokenView } from './TokenView'

export interface TokenViewProps {
  token?: TokenQueryFullData | null
  onMount: (element: HTMLDivElement) => void
}

export default TokenView
