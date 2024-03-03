import { useSX1155NFTFactory } from '@src/hooks/contracts/useSX1155NFTFactory'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import LoadingButton from '../ui/Button/LoadingButton'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import {
  StyledTextField,
  TextFieldBox,
  TextFieldTitle,
} from './styled-components'

type FormInputs = {
  name: string
  symbol: string
  uri: string
  admin: string
  editor: string
}

interface CreateProjectFormProps {
  onSuccessSubmit(): void
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onSuccessSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const { t } = useTranslation('project', { keyPrefix: 'createProject' })

  const { call, txLoading } = useSX1155NFTFactory()

  const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
    e?.preventDefault()
    const { name, symbol, admin, uri, editor } = data

    try {
      await call('deployNFTContract', [name, symbol, uri, admin, editor])
      onSuccessSubmit()
    } catch {
      // TODO: Add error handler
    }
  }

  return (
    <Box pt={4} pb={2} px={2}>
      <Text.h1 mb={5} textAlign='center'>
        {t('title')}
      </Text.h1>

      <Flex as='form' flexDirection='column' onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <TextFieldBox mr={3}>
            <TextFieldTitle>{t('form.name')}</TextFieldTitle>
            <StyledTextField
              width='100%'
              inputProps={register('name', { required: true })}
              placeholder={t('formPlaceholders.name')}
              error={errors.name?.message}
            />
          </TextFieldBox>
          <TextFieldBox>
            <TextFieldTitle>{t('form.symbol')}</TextFieldTitle>
            <StyledTextField
              width='100%'
              inputProps={register('symbol', { required: true })}
              placeholder={t('formPlaceholders.symbol')}
              error={errors.symbol?.message}
            />
          </TextFieldBox>
        </Flex>
        <TextFieldBox>
          <TextFieldTitle>{t('form.uri')}</TextFieldTitle>
          <StyledTextField
            width='100%'
            inputProps={register('uri', { required: true })}
            placeholder={t('formPlaceholders.uri')}
            error={errors.uri?.message}
          />
        </TextFieldBox>
        <TextFieldBox>
          <TextFieldTitle>{t('form.adminAddress')}</TextFieldTitle>
          <StyledTextField
            width='100%'
            inputProps={register('admin', { required: true })}
            placeholder={t('formPlaceholders.adminAddress')}
            error={errors.admin?.message}
          />
        </TextFieldBox>
        <TextFieldBox>
          <TextFieldTitle>{t('form.editorAddress')}</TextFieldTitle>
          <StyledTextField
            width='100%'
            inputProps={register('editor', { required: true })}
            placeholder={t('formPlaceholders.editorAddress')}
            error={errors.editor?.message}
          />
        </TextFieldBox>

        <LoadingButton loading={txLoading}>{t('form.submit')}</LoadingButton>
      </Flex>
    </Box>
  )
}

export default CreateProjectForm
