import { useSX1155NFTFactory } from '@src/hooks/contracts/useSX1155NFTFactory'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import { StyledTextField, TextFieldBox, TextFieldTitle } from './styled-components'
import AsyncButton from '../ui/Button/LoadingButton'

type FormInputs = {
  name: string
  symbol: string
  admin: string
  issuer: string
  editor: string
}

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()
  const { t } = useTranslation('createProject')

  const { call, txLoading } = useSX1155NFTFactory()

  const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
    e?.preventDefault()
    const { name, symbol, admin, issuer, editor } = data
    return await call('deployNFTContract', [name, symbol, admin, issuer, editor])
  }

  return (
    <Box py={4} px={2}>
      <Text.h1 mb={5} textAlign="center">
        {t('title')}
      </Text.h1>

      <Flex as="form" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <TextFieldBox mr={3}>
            <TextFieldTitle>{t('form.name')}</TextFieldTitle>
            <StyledTextField
              width="100%"
              inputProps={register('name', { required: true })}
              placeholder={t('formPlaceholders.name')}
              error={errors.name?.message}
            />
          </TextFieldBox>
          <TextFieldBox>
            <TextFieldTitle>{t('form.symbol')}</TextFieldTitle>
            <StyledTextField
              width="100%"
              inputProps={register('symbol', { required: true })}
              placeholder={t('formPlaceholders.symbol')}
              error={errors.symbol?.message}
            />
          </TextFieldBox>
        </Flex>
        <TextFieldBox>
          <TextFieldTitle>{t('form.adminAddress')}</TextFieldTitle>
          <StyledTextField
            width="100%"
            inputProps={register('admin', { required: true })}
            placeholder={t('formPlaceholders.adminAddress')}
            error={errors.admin?.message}
          />
        </TextFieldBox>
        <TextFieldBox>
          <TextFieldTitle>{t('form.issuerAddress')}</TextFieldTitle>
          <StyledTextField
            width="100%"
            inputProps={register('issuer', { required: true })}
            placeholder={t('formPlaceholders.issuerAddress')}
            error={errors.issuer?.message}
          />
        </TextFieldBox>
        <TextFieldBox>
          <TextFieldTitle>{t('form.editorAddress')}</TextFieldTitle>
          <StyledTextField
            width="100%"
            inputProps={register('editor', { required: true })}
            placeholder={t('formPlaceholders.editorAddress')}
            error={errors.editor?.message}
          />
        </TextFieldBox>

        <AsyncButton loading={txLoading}>{t('form.submit')}</AsyncButton>
      </Flex>
    </Box>
  )
}

export default CreateProjectForm
