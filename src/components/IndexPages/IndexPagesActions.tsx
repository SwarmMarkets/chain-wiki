import Button from 'src/components/ui/Button/Button'
import Flex from 'src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'
import { IpfsIndexPage } from 'src/shared/utils/ipfs/types'

interface IndexPagesActionsProps {
  nftId: string
  newIndexPages: IpfsIndexPage[]
  isEditMode: boolean
  onSave(): void
  onEdit(): void
  onCancel(): void
}

const IndexPagesActions: React.FC<IndexPagesActionsProps> = ({
  onSave,
  onEdit,
  onCancel,
  newIndexPages,
  nftId,
  isEditMode = false,
}) => {
  const { t } = useTranslation('buttons')

  if (isEditMode) {
    return (
      <Flex>
        <Button height='30px' py={0} onClick={onCancel}>
          {t('cancel')}
        </Button>
        <UpdateNftContentButton
          ml={2}
          height='30px'
          py={0}
          nftAddress={nftId}
          onSuccess={onSave}
          ipfsIndexPagesToUpdate={newIndexPages}
        >
          {t('save')}
        </UpdateNftContentButton>
      </Flex>
    )
  }

  return (
    <Flex>
      <Button height='30px' py={0} onClick={onEdit}>
        {t('edit')}
      </Button>
    </Flex>
  )
}

export default IndexPagesActions
