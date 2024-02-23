import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import useModalState from '@src/hooks/useModalState'
import {
  generateIpfsArticleContent,
  generateIpfsProjectContent,
} from '@src/shared/utils/ipfs'
import { useStorageUpload } from '@thirdweb-dev/react'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button, { ButtonProps } from '../ui/Button/Button'
import UpdateContentModal, { Steps } from './UpdateContentModal'
import { IpfsVoteProposal } from '@src/shared/types/ipfs'

interface ProjectProps {
  contentType: 'project'
  articleId?: never // `articleId` is not applicable for projects, so it's never present.
}

interface ArticleProps {
  contentType: 'article'
  articleId: number // For articles, `articleId` is required.
}

type UpdateContentButtonProps = (ProjectProps | ArticleProps) & {
  projectAddress: string
  content: string
  voteProposal?: IpfsVoteProposal
} & ButtonProps

const UpdateContentButton: React.FC<UpdateContentButtonProps> = ({
  contentType,
  articleId,
  projectAddress,
  content,
  voteProposal,
  ...buttonProps
}) => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { t } = useTranslation('buttons')
  const { isOpen, open, close } = useModalState(false)

  const { call, txLoading, result, isTxError } = useSX1155NFT(projectAddress)
  const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload()

  const uploadContent = async () => {
    let ipfsContent
    if (contentType === 'project') {
      ipfsContent = generateIpfsProjectContent({
        name: projectAddress,
        address: projectAddress,
        htmlContent: content,
      })
    } else {
      ipfsContent = generateIpfsArticleContent({
        tokenId: articleId,
        name: projectAddress,
        address: projectAddress,
        htmlContent: content,
        voteProposal: voteProposal,
      })
    }
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const firstUri = uris[0]
    return firstUri
  }

  const signTransaction = useCallback(
    (uri: string) => {
      if (contentType === 'project') {
        return call('setKya', [uri])
      } else {
        return call('setTokenKya', [articleId, uri])
      }
    },
    [call, contentType, articleId]
  )

  const startContentUpdate = async () => {
    open()
    const uri = await uploadContent()
    setIpfsUri(uri)
    if (uri) signTransaction(uri)
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

  return (
    <>
      <UpdateContentModal
        contentType={contentType}
        steps={steps}
        isOpen={isOpen}
        onClose={close}
      />
      <Button mt={15} onClick={startContentUpdate} {...buttonProps}>
        {t('updateContent')}
      </Button>
    </>
  )
}

export default UpdateContentButton
