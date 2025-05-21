import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import useMakePreferredForm, {
  MakePreferredFormInputs,
} from './useMakePreferredForm'

interface MakePreferredFormProps {
  nftAddress: string
}

const MakePreferredForm: React.FC<MakePreferredFormProps> = ({
  nftAddress,
}) => {
  const { t } = useTranslation('nft')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMakePreferredForm()

  const { signTransaction, tx } = useNFTUpdate(nftAddress)

  const onSubmit: SubmitHandler<MakePreferredFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { address } = data

    console.log(address)

    signTransaction({ preferredAttestatorToAdd: address })
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
        className='w-full'
        inputProps={{
          placeholder: t('attestatorsManager.form.makePreferred'),
          ...register('address'),
        }}
        errorMessage={errors.address?.message}
      />
      <Button type='submit' loading={tx.txLoading} className='w-4/12'>
        {t('attestatorsManager.actions.makePreferred')}
      </Button>
    </form>
  )
}

export default MakePreferredForm
