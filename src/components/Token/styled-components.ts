import styled from 'styled-components'
import Content from '@src/components/Content'
import IndexPages from '../IndexPages'

const boxStyles = `
    margin-top: 78px;
    max-width: 210px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto; 
    position: sticky;
    top: 24px;
    box-sizing: border-box;
    max-height: calc(100vh - 336px);
    min-height: 500px;
    border-radius: 5px;
    padding-right: 14px;
`

export const TokenStyledContent = styled(Content)`
  ${boxStyles}
`

export const TokenStyledIndexPages = styled(IndexPages)`
  ${boxStyles}
`

export const ContentPlaceholder = styled.div`
  width: 210px;
  margin-top: 20px;
  word-wrap: break-word;
`
