import { useChainId } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import EditorBox from 'src/components/Editor/EditorBox'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import Icon from 'src/components/ui-kit/Icon/Icon'
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

  return <EditorBox content={content} onChange={updateContent} />
}

export default EditorView
