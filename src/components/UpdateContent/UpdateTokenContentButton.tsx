import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import { IpfsTokenContent } from '@src/shared/types/ipfs'
import { generateIpfsTokenContent } from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { ChildrenProp } from '@src/shared/types/common-props'
import useToken from '@src/hooks/subgraph/useToken'
import { getUniqueId } from '@src/shared/utils'

interface UpdateTokenContentButtonProps extends ButtonProps, ChildrenProp {
  tokenAddress: string
  projectAddress: string
  tokenContentToUpdate: Partial<IpfsTokenContent>
  onSuccess?(): void
}

const UpdateTokenContentButton: React.FC<UpdateTokenContentButtonProps> = ({
  tokenAddress,
  projectAddress,
  tokenContentToUpdate,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const {
    call,
    txLoading,
    result,
    isTxError,
    reset: resetCallState,
  } = useSX1155NFT(projectAddress)
  const {
    mutateAsync: upload,
    isLoading,
    isSuccess,
    reset: resetStorageState,
  } = useStorageUpload()
  const { token } = useToken(tokenAddress)
  const tokenId = Number(token?.id.split('-')[1])

  const uploadContent = async () => {
    if (!token?.ipfsContent) return

    const content = {
      ...token?.ipfsContent,
      ...tokenContentToUpdate,
    }

    // set data-id attributes
    if (tokenContentToUpdate.htmlContent) {
      const contentElem = document.createElement('div')
      contentElem.innerHTML = tokenContentToUpdate.htmlContent
      const children = Array.from(contentElem.children)

      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        if (!item.hasAttribute('data-id')) {
          item.setAttribute('data-id', getUniqueId())
        }
      }
      content.htmlContent = contentElem.innerHTML
    }

    const ipfsContent = generateIpfsTokenContent(content)
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (uri: string) => {
      return call('setTokenUri', [tokenId, uri])
    },
    [call, tokenId]
  )

  const startContentUpdate = async () => {
    open()
    const uri = await uploadContent()
    if (!uri) return

    setIpfsUri(uri)

    const res = await signTransaction(uri)

    if (res) {
      onSuccess?.()
      close()
      resetCallState()
      resetStorageState()
    }
  }

  const steps = useMemo(() => {
    return {
      [Steps.PrepareContent]: { success: true, loading: false },
      [Steps.UploadToIPFS]: { success: isSuccess, loading: isLoading },
      [Steps.SignTransaction]: {
        success: !!result,
        loading: txLoading,
        error: isTxError,
        retry: () => signTransaction(ipfsUri),
      },
    }
  }, [
    ipfsUri,
    isLoading,
    isSuccess,
    isTxError,
    result,
    signTransaction,
    txLoading,
  ])

  const caption = children || t('updateContent')

  return (
    <>
      <UpdateContentModal
        contentType='token'
        steps={steps}
        isOpen={isOpen}
        onClose={close}
      />
      <Button mt={15} onClick={startContentUpdate} {...buttonProps}>
        {caption}
      </Button>
    </>
  )
}

export default UpdateTokenContentButton
