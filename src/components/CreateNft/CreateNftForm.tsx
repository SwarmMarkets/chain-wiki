import { useSX1155NFTFactory } from 'src/hooks/contracts/useSX1155NFTFactory'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import LoadingButton from '../ui/Button/LoadingButton'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import { LogoPreview, LogoWrapper } from './styled-components'
import useCreateNftForm, {
  CreateNftFormInputs,
} from 'src/hooks/forms/useCreateNftForm'
import { generateSymbolFromString } from 'src/shared/utils'
import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import UploadFileButton from '../common/UploadFileButton'
import TextField from '../ui/TextField/TextField'
interface CreateNftFormProps {
  onSuccessSubmit(): void
}

const CreateNftForm: React.FC<CreateNftFormProps> = ({ onSuccessSubmit }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'createNft' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateNftForm()
  const { call, txLoading } = useSX1155NFTFactory()
  const account = useAddress()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { name } = data
    const symbol = generateSymbolFromString(name)
    const admin = account
    const editor = account
    const jsonData = JSON.stringify({
      logoUrl: uploadedLogoUrl,
    })

    try {
      await call('deployNFTContract', [name, symbol, jsonData, admin, editor])
      onSuccessSubmit()
    } catch {
      // TODO: Add error handler
    }
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  return (
    <Box pt={4} pb={2} px={2}>
      <Text.h1 mb={5} textAlign='center'>
        {t('title')}
      </Text.h1>
      <Flex as='form' flexDirection='column' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          mb='1em'
          label={t('form.name')}
          width='100%'
          inputProps={{ ...register('name'), height: '40px' }}
          placeholder={t('formPlaceholders.name')}
          error={errors.name?.message}
        />
        <Box mb={4}>
          <UploadFileButton width='100%' onUpload={handleUploadLogo} mt={2}>
            {t('form.uploadLogo')}
          </UploadFileButton>
          {uploadedLogoUrl && (
            <LogoWrapper mt={2} justifyContent='center' p='20px'>
              <LogoPreview src={uploadedLogoUrl} />
            </LogoWrapper>
          )}
        </Box>
        <LoadingButton type='submit' loading={txLoading}>
          {t('form.submit')}
        </LoadingButton>
      </Flex>
    </Box>
  )
}

export default CreateNftForm
