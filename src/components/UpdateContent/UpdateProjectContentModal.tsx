import { BasicModalProps } from '@src/shared/types/common-props'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import Button from '../ui/Button/Button'
import Flex from '../ui/Flex'
import Modal from '../ui/Modal'
import Text from '../ui/Text'
import { List, ListItem, ListItemProps } from './StepsList'
import { TextDescription } from './styled-components'

interface UpdateProjectContentModalProps extends BasicModalProps {
  steps: Record<Steps, ListItemProps>
}

// eslint-disable-next-line react-refresh/only-export-components
export enum Steps {
  PrepareContent = 0,
  UploadToIPFS = 1,
  SignTransaction = 2,
}

const UpdateProjectContentModal: React.FC<UpdateProjectContentModalProps> = ({
  steps,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation('updateContent')

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth='500px' width='100%'>
      <Flex
        flexDirection='column'
        justifyContent='space-between'
        minHeight='inherit'
      >
        <Box>
          <Text.h1 my={3}>{t('project.title')}</Text.h1>
          <TextDescription>{t('project.description')}</TextDescription>

          <List>
            <ListItem
              loading={steps[Steps.PrepareContent].loading}
              success={steps[Steps.PrepareContent].success}
            >
              {t(`steps.${Steps.PrepareContent}`)}
            </ListItem>
            <ListItem
              loading={steps[Steps.UploadToIPFS].loading}
              success={steps[Steps.UploadToIPFS].success}
            >
              {t(`steps.${Steps.UploadToIPFS}`)}
            </ListItem>
            <ListItem
              loading={steps[Steps.SignTransaction].loading}
              success={steps[Steps.SignTransaction].success}
              error={steps[Steps.SignTransaction].error}
              retry={steps[Steps.SignTransaction].retry}
            >
              {t(`steps.${Steps.SignTransaction}`)}
            </ListItem>
          </List>
        </Box>

        <Button onClick={onClose}>{t('actions.cancel')}</Button>
      </Flex>
    </Modal>
  )
}

export default UpdateProjectContentModal
