import clsx from 'clsx'
import React from 'react'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { NFTWithMetadata } from 'src/shared/utils'
import ReadHeaderSkeleton from './ReadHeaderSkeleton'
import IconButton from 'src/components/ui-kit/IconButton'
import Icon from 'src/components/ui-kit/Icon/Icon'
import DotMenu from 'src/components/ui-kit/DotMenu/DotMenu'

interface ReadHeaderProps {
  nft: NFTWithMetadata | null
  preview?: boolean
  isMobile?: boolean
  toggleSidebar?: () => void
}

const ReadHeader: React.FC<ReadHeaderProps> = ({
  nft,
  preview,
  isMobile,
  toggleSidebar,
}) => {
  const customization = useCustomizationStore()
  const headerLinks = preview
    ? customization.headerLinks
    : nft?.headerLinksContent?.headerLinks
  const headerBackground = preview
    ? customization.headerBackground
    : nft?.headerBackground
  const headerLinksColor = preview
    ? customization.linksColor
    : nft?.headerLinksContent?.color

  const logoUrl = preview ? customization.logoUrl : nft?.logoUrl

  const linkStyle = headerLinksColor
    ? {
        color: headerLinksColor,
      }
    : {}

  const headerStyle = headerBackground
    ? { backgroundColor: headerBackground }
    : {}

  if (!nft && !preview) {
    return <ReadHeaderSkeleton />
  }

  const renderLinks = () => {
    if (!headerLinks?.length) return null

    if (isMobile) {
      const [firstLink, ...restLinks] = headerLinks
      return (
        <>
          <a
            href={firstLink.link}
            className='text-primary-contrast hover:opacity-85'
            target='_blank'
            rel='noopener noreferrer'
            style={linkStyle}
          >
            {firstLink.title}
          </a>
          {restLinks.length > 0 && (
            <DotMenu
              iconProps={{ style: { color: headerLinksColor } }}
              iconButtonProps={{ hoverBackground: 'primary-contrast/10' }}
            >
              {restLinks.map(link => (
                <li
                  key={link.id || link.link}
                  className='px-2 py-1.5 hover:bg-gray-100 cursor-pointer rounded'
                >
                  <a
                    href={link.link}
                    className='text-gray-900 block w-full'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </DotMenu>
          )}
        </>
      )
    }

    return headerLinks.map(link => (
      <a
        key={link.id || link.link}
        href={link.link}
        className='text-primary-contrast hover:opacity-85'
        target='_blank'
        rel='noopener noreferrer'
        style={linkStyle}
      >
        {link.title}
      </a>
    ))
  }

  return (
    <header
      className={clsx(
        'bg-primary py-3 w-full',
        !preview && 'fixed top-0 left-0 z-10 mb-6'
      )}
      style={headerStyle}
    >
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {isMobile && toggleSidebar && (
            <IconButton
              onClick={toggleSidebar}
              hoverBackground='primary-contrast/10'
            >
              <Icon
                name='hamburger'
                className='w-6 h-6'
                color={headerLinksColor || '#fff'}
              />
            </IconButton>
          )}
          {logoUrl && (
            <img src={logoUrl} alt='Logo' className='max-w-80 max-h-12' />
          )}
        </div>

        <div className='flex items-center gap-6'>{renderLinks()}</div>
      </div>
    </header>
  )
}

export default ReadHeader
