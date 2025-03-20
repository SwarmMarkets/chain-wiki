import clsx from 'clsx'
import { NFTWithMetadata } from 'src/shared/utils'

interface ReadHeaderProps {
  nft: NFTWithMetadata | null
  preview?: boolean
}

const ReadHeader: React.FC<ReadHeaderProps> = ({ nft, preview }) => {
  const linkStyle = nft?.headerLinksContent?.color
    ? {
        color: nft?.headerLinksContent?.color,
      }
    : {}

  const headerStyle = nft?.headerBackground
    ? { backgroundColor: nft?.headerBackground }
    : {}

  return (
    <header
      className={clsx(
        'bg-primary py-3 w-full',
        !preview && 'fixed top-0 left-0 z-10 mb-6'
      )}
      style={headerStyle}
    >
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center max-h-10 justify-between'>
        <img src={nft?.logoUrl} alt='Logo' className='max-w-80 max-h-12' />

        <div className='flex gap-6'>
          {nft?.headerLinksContent?.headerLinks.map(link => (
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
  )
}

export default ReadHeader
