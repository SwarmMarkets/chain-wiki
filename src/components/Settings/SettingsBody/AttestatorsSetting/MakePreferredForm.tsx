import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import useMakePreferredForm, {
  MakePreferredFormInputs,
} from './useMakePreferredForm'
import { useAddressNameStore } from 'src/components/Nft/NftRoleManager/addressNameStore'
import { AdditionalRoles } from 'src/shared/enums'

interface MakePreferredFormProps {
  nftAddress: string
}

const MakePreferredForm: React.FC<MakePreferredFormProps> = ({
  nftAddress,
}) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.attestatorsManager' })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMakePreferredForm()
  const { setAddressName } = useAddressNameStore()

  const { signTransaction, tx } = useNFTUpdate(nftAddress)

  const onSubmit: SubmitHandler<MakePreferredFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { address, name } = data

    const success = await signTransaction({ preferredAttestatorToAdd: address })

    if (success && name) {
      setAddressName(address, AdditionalRoles.PREFERRED_ATTESTOR, name)
    }
  }

  useEffect(() => {
    if (tx.isSuccess) {
      reset()
    }
  }, [reset, tx.isSuccess])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-2 w-full items-start'
    >
      <TextField
        className='w-5/12'
        inputProps={{
          placeholder: t('formPlaceholders.makePreferred'),
          ...register('address'),
        }}
        errorMessage={errors.address?.message}
      />
      <TextField
        className='w-4/12'
        inputProps={{
          placeholder: t('formPlaceholders.name'),
          ...register('name'),
        }}
        errorMessage={errors.address?.message}
      />
      <Button type='submit' loading={tx.isPending} className='w-3/12'>
        {t('actions.makePreferred')}
      </Button>
    </form>
  )
}

export default MakePreferredForm
