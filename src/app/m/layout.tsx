'use client'

import { usePathname } from 'next/navigation'
import Layout from 'src/components/common/Layout'
import NftLayout from 'src/components/common/Layout/NftLayout'
import Routes from 'src/shared/consts/routes'

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isHomePage = pathname === Routes.manager.home

  if (isHomePage) {
    return <Layout>{children}</Layout>
  }

  return (
    <Layout>
      <NftLayout>{children}</NftLayout>
    </Layout>
  )
}

export default ManagerLayout
