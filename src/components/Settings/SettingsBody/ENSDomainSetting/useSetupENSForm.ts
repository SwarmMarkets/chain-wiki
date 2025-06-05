import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'
import yup from 'src/shared/validations/yup'

export interface SetupENSFormInputs {
  domain: string
}

const useSetupENSForm = () => {
  const { t } = useTranslation('nft', {
    keyPrefix: 'settings.ens.formErrors',
  })
  const resolver = useYupValidationResolver(
    yup.object({
      domain: yup
        .string()
        .required(t('domain.required'))
        .isENSName(t('domain.invalid')),
    })
  )

  return useForm<SetupENSFormInputs>({
    resolver,
  })
}

export default useSetupENSForm
