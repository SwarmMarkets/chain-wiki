import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import UpdateProjectContentButton from '../UpdateContent/UpdateProjectContentButton'

interface IndexPagesActionsProps {
  nftId: string
  newIndexPages: string[]
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
        <UpdateProjectContentButton
          ml={2}
          height='30px'
          py={0}
          projectAddress={nftId}
          onSuccess={onSave}
          projectContentToUpdate={{ indexPages: newIndexPages }}
        >
          {t('save')}
        </UpdateProjectContentButton>
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
