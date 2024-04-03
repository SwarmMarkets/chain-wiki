import { useSX1155NFTFactory } from '@src/hooks/contracts/useSX1155NFTFactory'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Box from '../ui/Box'
import LoadingButton from '../ui/Button/LoadingButton'
import Flex from '../ui/Flex'
import Text from '../ui/Text'
import {
  LogoPreview,
  LogoWrapper,
  StyledTextField,
  TextFieldBox,
  TextFieldTitle,
} from './styled-components'

import useCreateNftForm, {
  CreateNftFormInputs,
} from '@src/hooks/forms/useCreateNftForm'
import {
  generateIpfsNftContent,
  generateSymbolFromString,
} from '@src/shared/utils'
import { useAddress, useStorageUpload } from '@thirdweb-dev/react'
import UploadFileButton from '../common/UploadFileButton'
import { useState } from 'react'
import { IpfsNftContent } from '@src/shared/types/ipfs'

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
  const { mutateAsync: upload, isLoading: ipfsLoading } = useStorageUpload()

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)

  const onSubmit: SubmitHandler<CreateNftFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { name } = data
    const symbol = generateSymbolFromString(name)
    const admin = account
    const editor = account

    const ipfsData: IpfsNftContent = {
      htmlContent: '',
      name,
      address: '',
    }
    if (uploadedLogoUrl) {
      ipfsData.logoUrl = uploadedLogoUrl
    }

    const ipfsContent = generateIpfsNftContent(ipfsData)
    const filesToUpload = [ipfsContent]
    const uris = await upload({ data: filesToUpload })
    const uri = uris[0]

    try {
      await call('deployNFTContract', [name, symbol, uri, admin, editor])
      onSuccessSubmit()
    } catch {
      // TODO: Add error handler
    }
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  const isLoading = txLoading || ipfsLoading

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
        <TextFieldBox>
          <UploadFileButton width='100%' mb={2} onUpload={handleUploadLogo}>
            {t('form.uploadLogo')}
          </UploadFileButton>
          {uploadedLogoUrl && (
            <LogoWrapper justifyContent='center' p='20px'>
              <LogoPreview src={uploadedLogoUrl} />
            </LogoWrapper>
          )}
        </TextFieldBox>
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
        <LoadingButton type='submit' loading={isLoading}>
          {t('form.submit')}
        </LoadingButton>
      </Flex>
    </Box>
  )
}

export default CreateNftForm
