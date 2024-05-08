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
import { useAddress } from '@thirdweb-dev/react'
import useCreateTokenForm, {
  CreateTokenFormInputs,
} from '@src/hooks/forms/useCreateTokenForm'
import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import { useParams } from 'react-router-dom'
interface CreateTokenFormProps {
  onSuccessSubmit(): void
}

const CreateTokenForm: React.FC<CreateTokenFormProps> = ({
  onSuccessSubmit,
}) => {
  const { t } = useTranslation('token', { keyPrefix: 'createToken' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateTokenForm()
  const { nftId = '' } = useParams()
  const account = useAddress()
  const { call, txLoading } = useSX1155NFT(nftId)
  const onSubmit: SubmitHandler<CreateTokenFormInputs> = async (
    { name },
    e
  ) => {
    e?.preventDefault()
    if (!account) return

    const to = account
    const amount = 1
    const tokenURI = JSON.stringify({ name })
    const data = '0x'

    try {
      await call('mint', [to, amount, tokenURI, data])
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
        <TextFieldBox>
          <TextFieldTitle>{t('form.name')}</TextFieldTitle>
          <StyledTextField
            width='100%'
            inputProps={register('name')}
            placeholder={t('formPlaceholders.name')}
            error={errors.name?.message}
          />
        </TextFieldBox>
        <LoadingButton type='submit' loading={txLoading}>
          {t('form.submit')}
        </LoadingButton>
      </Flex>
    </Box>
  )
}

export default CreateTokenForm
