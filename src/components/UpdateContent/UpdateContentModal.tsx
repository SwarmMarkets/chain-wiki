import { BasicModalProps } from '@src/shared/types/common-props'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import Button from '../ui/Button/Button'
import Flex from '../ui/Flex'
import Modal from '../ui/Modal'
import Text from '../ui/Text'
import { TextDescription } from './styled-components'
import {
  ActionStateItem,
  ActionStateItemProps,
  ActionStateWrap,
} from '../ui/ActionState'

export type ContentType = 'project' | 'article'

interface UpdateProjectContentModalProps extends BasicModalProps {
  contentType: ContentType
  steps: Record<Steps, ActionStateItemProps>
}

// eslint-disable-next-line react-refresh/only-export-components
export enum Steps {
  PrepareContent = 0,
  UploadToIPFS = 1,
  SignTransaction = 2,
}

const UpdateContentModal: React.FC<UpdateProjectContentModalProps> = ({
  contentType,
  steps,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation('updateContent')

  const isProject = contentType === 'project'
  const title = isProject ? t('project.title') : t('article.title')
  const description = isProject ? t('project.title') : t('article.title')

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth='500px' width='100%'>
      <Flex
        flexDirection='column'
        justifyContent='space-between'
        minHeight='inherit'
      >
        <Box>
          <Text.h1 my={3}>{title}</Text.h1>
          <TextDescription>{description}</TextDescription>

          <ActionStateWrap>
            <ActionStateItem
              loading={steps[Steps.PrepareContent].loading}
              success={steps[Steps.PrepareContent].success}
            >
              {t(`steps.${Steps.PrepareContent}`)}
            </ActionStateItem>
            <ActionStateItem
              loading={steps[Steps.UploadToIPFS].loading}
              success={steps[Steps.UploadToIPFS].success}
            >
              {t(`steps.${Steps.UploadToIPFS}`)}
            </ActionStateItem>
            <ActionStateItem
              loading={steps[Steps.SignTransaction].loading}
              success={steps[Steps.SignTransaction].success}
              error={steps[Steps.SignTransaction].error}
              retry={steps[Steps.SignTransaction].retry}
            >
              {t(`steps.${Steps.SignTransaction}`)}
            </ActionStateItem>
          </ActionStateWrap>
        </Box>

        <Button onClick={onClose}>{t('actions.cancel')}</Button>
      </Flex>
    </Modal>
  )
}

export default UpdateContentModal
