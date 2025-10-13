import NftReadPage from 'src/components/pages/NftReadPage'
import { ReadParams } from 'src/shared/consts/routes'

const Page: React.FC<{ params: Promise<ReadParams['token']> }> = ({
  params,
}) => {
  return <NftReadPage params={params} />
}

export default Page
