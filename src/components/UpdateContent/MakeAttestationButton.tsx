import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import { ChildrenProp } from 'src/shared/types/common-props'
import { generateIpfsAttestationContent } from 'src/shared/utils'
import Button, { ButtonProps } from '../ui-kit/Button/Button'

interface MakeAttestationButtonProps extends ButtonProps, ChildrenProp {
  nftAddress: string
  sectionId: string | null
  attestationContent: string
  tokenId: string
  onSuccess?(): void
}

const MakeAttestationButton: React.FC<MakeAttestationButtonProps> = ({
  nftAddress,
  sectionId,
  attestationContent,
  tokenId,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const { t } = useTranslation('buttons')

  const { call, txLoading, reset: resetCallState } = useSX1155NFT(nftAddress)
  const {
    mutateAsync: upload,
    isLoading,
    reset: resetStorageState,
  } = useStorageUpload()
  const shortTokenId = Number(tokenId.split('-')[1])

  const uploadContent = async () => {
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
    const uri = await uploadContent()
    if (!uri) return

    const res = await signTransaction(uri)
    if (res) {
      onSuccess?.()
      resetCallState()
      resetStorageState()
    }
  }

  const caption = children || t('updateContent')

  return (
    <>
      <Button
        loading={txLoading || isLoading}
        className='mt-4'
        onClick={startContentUpdate}
        {...buttonProps}
      >
        {caption}
      </Button>
    </>
  )
}

export default MakeAttestationButton
