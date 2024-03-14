import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import { ChildrenProp } from '@src/shared/types/common-props'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { generateIpfsAttestationContent } from '@src/shared/utils'

interface MakeAttestationButtonProps extends ButtonProps, ChildrenProp {
  projectAddress: string
  sectionId: string | null
  attestationContent: string
  tokenId: string
  onSuccess?(): void
}

const MakeAttestationButton: React.FC<MakeAttestationButtonProps> = ({
  projectAddress,
  sectionId,
  attestationContent,
  tokenId,
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
  const shortTokenId = Number(tokenId.split('-')[1])

  const uploadContent = async () => {
    // if (!token?.ipfsContent) return
    if (!sectionId) return

    const ipfsContent = generateIpfsAttestationContent({
      htmlContent: attestationContent,
    })
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }
  const signTransaction = useCallback(
    (uri: string) => {
      return call('makeAttestation', [
        shortTokenId,
        JSON.stringify({ sectionId, uri }),
      ])
    },
    [call, shortTokenId, sectionId]
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
        contentType='attestation'
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

export default MakeAttestationButton
