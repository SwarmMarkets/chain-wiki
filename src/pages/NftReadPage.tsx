import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NftReadPageSkeleton from './NftReadPageSkeleton'
import AttestationHtmlRender from 'src/components/HtmlRender/AttestationHtmlRender'
import AttestationDrawer from 'src/components/Token/Attestation/AttestationDrawer'

interface NftReadPageProps {
  title: string
  html: string | null | undefined
}

interface SelectedSection {
  id: string | null
  htmlContent: string | null
}

const NftReadPage: React.FC<NftReadPageProps> = ({ title, html }) => {
  const { t } = useTranslation('nft')
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedSection, setSelectedSection] = useState<SelectedSection>({
    id: null,
    htmlContent: null,
  })

  const handleSelectSection = useCallback((section: SelectedSection) => {
    console.log(section)
    setSelectedSection(section)
  }, [])

  const handleCloseDrawer = () => {
    setSelectedSection({
      id: null,
      htmlContent: null,
    })
  }

  if (!html) {
    return <NftReadPageSkeleton />
  }

  return (
    <div>
      <div className='typo-heading2 text-main-accent mb-3 font-bold'>
        {title}
      </div>
      <AttestationHtmlRender
        id='read-page-content'
        html={html}
        ref={contentRef}
        onSelectSection={handleSelectSection}
      />

      <AttestationDrawer
        isOpen={!!selectedSection.id}
        section={selectedSection}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}

export default NftReadPage
