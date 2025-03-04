import { Outlet, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'

const ReadLayout = () => {
  const { nftId = '' } = useParams()

  const { nft } = useNFT(nftId, { fetchFullData: true })

  const linkStyle = nft.headerLinksContent?.color
    ? {
        color: nft.headerLinksContent?.color,
      }
    : {}

  const headerStyle = nft.headerBackground
    ? { backgroundColor: nft.headerBackground }
    : {}

  return (
    <div>
      <header className='bg-primary mb-4 py-3' style={headerStyle}>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center max-h-10 justify-between'>
          <img src={nft.logoUrl} alt='Logo' className='max-w-80 max-h-12' />

          <div className='flex gap-6'>
            {nft.headerLinksContent?.headerLinks.map(link => (
              <a
                key={link.id}
                href={link.link}
                className='text-primary-contrast hover:opacity-85'
                target='_blank'
                rel='noopener noreferrer'
                style={linkStyle}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </header>
      <div className='grid grid-cols-12 gap-4 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto'>
        <aside className='bg-error p-4 col-span-3'>Aside</aside>
        <main className='bg-primary p-4 col-span-7'>
          <Outlet />
        </main>
        <aside className='bg-error p-4 col-span-2'>Aside</aside>
      </div>
    </div>
  )
}

export default ReadLayout
