
import { TokenQueryFullData } from '@src/shared/types/ipfs'
import { ArticleView } from './ArticleView'

export interface ArticleViewProps {
  article?: TokenQueryFullData | null
  onMount: (element: HTMLDivElement) => void
}

export default ArticleView
