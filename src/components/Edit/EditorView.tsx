import { useChainId } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import EditorBox from 'src/components/Editor/EditorBox'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import Icon from 'src/components/ui/Icon'
import Text from 'src/components/ui/Text'
import { useEditingStore } from 'src/shared/store/editing-store'
import { getExplorerUrl, NFTWithMetadata } from 'src/shared/utils'
import { useTheme } from 'styled-components'
import LoadingButton from '../ui/Button/LoadingButton'
import useEdit from './useEdit'
import Button from '../ui/Button/Button'
import useNFTRoleManager from '../Nft/NftRoleManager/useNFTRoleManager'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { Roles } from 'src/shared/enums'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'

interface EditorViewProps {
  nft: NFTWithMetadata
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ nft, content }) => {
  const { t } = useTranslation('buttons')
  const { nftId = '' } = useParams()
  const theme = useTheme()
  const { grantRole, txLoading } = useNFTRoleManager(nftId)
  const { smartAccountInfo } = useSmartAccount()
  const { smartAccountPermissions, loading: isNftPermissionsLoading } =
    useNftPermissions(nftId)

  const chainId = useChainId()

  const handleIconClick = () => {
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nftId,
    })
    window.open(explorerUrl, '_blank')
  }

  const [isHovered, setIsHovered] = useState(false)

  const {
    currEditableToken,
    editedNft,
    getEditedTokenById,
    getAddedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
    updateNft,
  } = useEditingStore()

  const { merge, mergeLoading } = useEdit()

  const updateContent = (content: string) => {
    if (currEditableToken) {
      const addedToken = getAddedTokenById(currEditableToken.id)

      if (addedToken) {
        updateOrCreateAddedToken({ ...addedToken, content })
        return
      }
      updateOrCreateEditedToken({
        id: currEditableToken.id,
        name:
          getEditedTokenById(currEditableToken.id)?.name ||
          currEditableToken.name,
        content,
      })
    } else {
      updateNft({ id: nftId, name: editedNft?.name || nft.name, content })
    }
  }

  const title = currEditableToken?.name || editedNft?.name || nft?.name

  const grantRoleForSmartAccount = async () => {
    if (smartAccountInfo?.address) {
      grantRole(smartAccountInfo?.address, Roles.EDITOR)
    }
  }

  return (
    <Box width='900px'>
      <Flex $gap='5px' flexDirection='column'>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          $gap='5px'
          mb='10px'
          style={{ position: 'relative' }}
        >
          <Text.h1 size={theme.fontSizes.large} weight={700}>
            {title}
          </Text.h1>
          {!isNftPermissionsLoading && (
            <Flex $gap='10px' alignItems='center'>
              {!smartAccountPermissions.canUpdateContent && (
                <LoadingButton
                  loading={txLoading}
                  onClick={grantRoleForSmartAccount}
                >
                  Enable batch editing
                </LoadingButton>
              )}
              <LoadingButton
                loading={mergeLoading}
                onClick={merge}
                disabled={!smartAccountPermissions.canUpdateContent}
              >
                {t('merge')}
              </LoadingButton>
              <Icon
                cursor='pointer'
                name='externalLink'
                size={10}
                color={
                  isHovered ? theme.palette.linkPrimary : theme.palette.black
                }
                onClick={handleIconClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <EditorBox content={content} onChange={updateContent} />
    </Box>
  )
}

export default EditorView
