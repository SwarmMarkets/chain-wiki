import { PropsWithChildren } from 'react'
import ReadLayout from 'src/components/common/Layout/ReadLayout'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <ReadLayout>{children}</ReadLayout>
}

export default Layout
