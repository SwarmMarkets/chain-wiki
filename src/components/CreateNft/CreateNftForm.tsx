import { useSX1155NFTFactory } from '@src/hooks/contracts/useSX1155NFTFactory'
import { SubmitHandler } from 'react-hook-form'
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

import useCreateNftForm, {
  CreateNftFormInputs,
} from '@src/hooks/forms/useCreateNftForm'
import { generateSymbolFromString } from '@src/shared/utils'
import { useAddress } from '@thirdweb-dev/react'

interface CreateNftFormProps {
  onSuccessSubmit(): void
}

const CreateNftForm: React.FC<CreateNftFormProps> = ({ onSuccessSubmit }) => {
  const { t } = useTranslation('project', { keyPrefix: 'createNft' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateNftForm()

  const { call, txLoading } = useSX1155NFTFactory()
  const account = useAddress()

  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { name, uri = '' } = data
    const symbol = generateSymbolFromString(name)
    const admin = account
    const editor = account

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
          <TextFieldBox>
            <TextFieldTitle>{t('form.name')}</TextFieldTitle>
            <StyledTextField
              width='100%'
              inputProps={register('name')}
              placeholder={t('formPlaceholders.name')}
              error={errors.name?.message}
            />
          </TextFieldBox>
        </Flex>
        {/* TODO: implement URI */}
        {/* <TextFieldBox>
          <TextFieldTitle>{t('form.uri')}</TextFieldTitle>
          <StyledTextField
            width='100%'
            inputProps={register('uri', { required: true })}
            placeholder={t('formPlaceholders.uri')}
            error={errors.uri?.message}
          />
        </TextFieldBox> */}
        <LoadingButton loading={txLoading}>{t('form.submit')}</LoadingButton>
      </Flex>
    </Box>
  )
}

export default CreateNftForm
