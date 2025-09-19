import useNFTUpdate, { NFTContentToUpdate } from 'src/hooks/useNFTUpdate'
import { ChildrenProp } from 'src/shared/types/common-props'
import {
  IpfsHeaderLinksContent,
  IpfsIndexPage,
  IpfsNftContent,
} from 'src/shared/utils/ipfs/types'
import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui-kit/Button/Button'
import Tooltip, { TooltipPosition } from '../ui-kit/Tooltip/Tooltip'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'

interface UpdateNftContentButtonProps extends ButtonProps, ChildrenProp {
  nftAddress: string
  nftContentToUpdate?: NFTContentToUpdate
  ipfsNftToUpdate?: Partial<IpfsNftContent>
  ipfsIndexPagesToUpdate?: IpfsIndexPage[]
  ipfsHeaderLinkToUpdate?: Partial<IpfsHeaderLinksContent>
  tooltipPosition?: TooltipPosition
  onSuccess?(): void
}

const UpdateNftContentButton: React.FC<UpdateNftContentButtonProps> = ({
  nftAddress,
  nftContentToUpdate,
  ipfsNftToUpdate,
  ipfsIndexPagesToUpdate,
  ipfsHeaderLinkToUpdate,
  tooltipPosition,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('buttons')

  const { permissions } = useNftPermissions(nftAddress)

  const {
    uploadContent,
    uploadIndexPagesContent,
    uploadHeaderLinksContent,
    signTransaction,
    storageUpload,
  } = useNFTUpdate(nftAddress)

  const startContentUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    let uri
    if (ipfsNftToUpdate?.htmlContent) {
      uri = await uploadContent(ipfsNftToUpdate)
    }

    let indexPagesUri
    if (ipfsIndexPagesToUpdate) {
      indexPagesUri = await uploadIndexPagesContent(ipfsIndexPagesToUpdate)
    }

    let headerLinksUri
    if (ipfsHeaderLinkToUpdate) {
      headerLinksUri = await uploadHeaderLinksContent(ipfsHeaderLinkToUpdate)
    }

    const res = await signTransaction({
      ...nftContentToUpdate,
      ...(uri && { uri }),
      ...(indexPagesUri && { indexPagesUri }),
      ...(headerLinksUri && { headerLinksUri }),
    })

    setIsLoading(false)

    if (res) {
      onSuccess?.()
      storageUpload.resetStorageState()
    }
  }

  const caption = children || t('updateContent')

  const tooltipContent = permissions.canUpdateContent
    ? ''
    : t('cannotUpdateContentTooltip')

  return (
    <Tooltip content={tooltipContent} position={tooltipPosition}>
      <Button onClick={startContentUpdate} {...buttonProps} loading={isLoading}>
        {caption}
      </Button>
    </Tooltip>
  )
}

export default UpdateNftContentButton
