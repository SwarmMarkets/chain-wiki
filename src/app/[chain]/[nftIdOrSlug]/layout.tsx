import ReadLayout from 'src/components/common/Layout/ReadLayout'
import { ReadParams } from 'src/shared/consts/routes'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<ReadParams['token']>
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return <ReadLayout params={params}>{children}</ReadLayout>
}

export default Layout
