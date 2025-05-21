import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useYupValidationResolver from 'src/hooks/useYupValidationResolvber'
import yup from 'src/shared/validations/yup'

export interface MakePreferredFormInputs {
  address: string
}

const useMakePreferredForm = () => {
  const { t } = useTranslation('nft', {
    keyPrefix: 'attestatorsManager.formErrors',
  })
  const resolver = useYupValidationResolver(
    yup.object({
      address: yup
        .string()
        .required(t('address.required'))
        .isEthereumAddress(t('address.invalid')),
    })
  )

  return useForm<MakePreferredFormInputs>({
    resolver,
  })
}

export default useMakePreferredForm
