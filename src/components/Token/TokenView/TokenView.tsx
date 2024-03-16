import AttestationHtmlRenderWrapper from '@src/components/HtmlRender/AttestationHtmlRender'
import Flex from '@src/components/ui/Flex'
import { useRef, useState } from 'react'
import { TokenViewProps } from '.'
import AttestationDrawer from '../Attestation/AttestationDrawer'
import TokenViewActions from './TokenViewActions'
import { StyledCard } from '@src/components/Nft/styled-components'
import { useTheme } from 'styled-components'
import Text from '@src/components/ui/Text'
import { useTranslation } from 'react-i18next'

export interface SelectedSection {
  id: string | null
  htmlContent: string | null
}

export const TokenView: React.FC<TokenViewProps> = ({
  token,
  onMount,
  onClickEditSite,
}) => {
  const { t } = useTranslation('token')
  const theme = useTheme()
  const [selectedSection, setSelectedSection] = useState<SelectedSection>({
    id: null,
    htmlContent: null,
  })
  const contentRef = useRef<HTMLDivElement>(null)

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  const onSelectSection = (section: SelectedSection) => {
    setSelectedSection(section)
  }

  const onCloseDrawer = () => {
    setSelectedSection({
      id: null,
      htmlContent: null,
    })
  }

  if (!token?.ipfsContent?.htmlContent)
    return (
      <StyledCard onClick={onClickEditSite}>
        <Text.p textAlign='center' color={theme.palette.borderPrimary}>
          {t('messages.editToken')}
        </Text.p>
      </StyledCard>
    )

  const isOpen = !!(selectedSection.htmlContent && selectedSection.id)

  return (
    <Flex flexDirection='column'>
      <AttestationHtmlRenderWrapper
        html={token?.ipfsContent?.htmlContent}
        onSelectSection={onSelectSection}
        onMount={onMountContent}
        ref={contentRef}
      />

      <Flex justifyContent='flex-end' mt={3}>
        <TokenViewActions />
      </Flex>

      <AttestationDrawer
        isOpen={isOpen}
        section={selectedSection}
        onClose={onCloseDrawer}
      />
    </Flex>
  )
}
