import Layout from 'src/components/common/Layout'
import NftLayout from 'src/components/common/Layout/NftLayout'

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <NftLayout>{children}</NftLayout>
    </Layout>
  )
}

export default ManagerLayout
