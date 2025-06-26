import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildrenProp } from 'src/shared/types/common-props'
import { generateIpfsAttestationContent } from 'src/shared/utils'
import SmartButton from '../SmartButton'
import { ButtonProps } from '../ui-kit/Button/Button'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'
import useSX1155NFT from 'src/hooks/contracts/nft/useSX1155NFT'
import useSendTx from 'src/hooks/web3/useSendTx'

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

  const { sendTx, isPending } = useSendTx()
  const { prepareMakeAttestationTx } = useSX1155NFT(nftAddress)
  const {
    mutateAsync: upload,
    isLoading,
    reset: resetStorageState,
  } = useIpfsUpload()
  const shortTokenId = Number(tokenId.split('-')[1])

  const uploadContent = async () => {
    if (!sectionId) return

    const ipfsContent = generateIpfsAttestationContent({
      htmlContent: attestationContent,
    })
    const filesToUpload = [ipfsContent]
    const uri = (await upload(filesToUpload)) as string

    return uri
  }
  const signTransaction = useCallback(
    (uri: string) => {
      const tx = prepareMakeAttestationTx({
        tokenId: BigInt(shortTokenId),
        comment: JSON.stringify({ sectionId, uri }),
      })

      return sendTx(tx)
    },
    [prepareMakeAttestationTx, shortTokenId, sectionId, sendTx]
  )

  const startContentUpdate = async () => {
    const uri = await uploadContent()
    if (!uri) return

    const res = await signTransaction(uri)
    if (res) {
      onSuccess?.()
      resetStorageState()
    }
  }

  const caption = children || t('updateContent')

  return (
    <>
      <SmartButton
        loading={isPending || isLoading}
        className='mt-4'
        onClick={startContentUpdate}
        {...buttonProps}
      >
        {caption}
      </SmartButton>
    </>
  )
}

export default MakeAttestationButton
