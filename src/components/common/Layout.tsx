import { ChildrenProp } from '@src/shared/types/common-props'
import styled from 'styled-components'
import Container from '../ui/Container'
import Header from './Header'
import SwitchNetworkAlert from './SwitchNetworkAlert'

const PageContainer = styled(Container)`
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  flex: 1;
  padding-top: 24px;
  padding-bottom: 24px;
`

const Layout = ({ children }: ChildrenProp) => {
  return (
    <>
      <SwitchNetworkAlert />
      <Header />
      <PageContainer>
        <main>{children}</main>
      </PageContainer>
    </>
  )
}

export default Layout
