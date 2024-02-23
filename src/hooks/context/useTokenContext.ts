import React from 'react'
import { TokenContext } from '@src/pages/ArticlePage'

export const useTokenContext = () => {
  return React.useContext(TokenContext)
}
