import { useTranslation } from 'react-i18next'
import useYupValidationResolver from '../useYupValidationResolver'
import yup from 'src/shared/validations/yup'
import { useForm } from 'react-hook-form'
import { Roles } from 'src/shared/enums'

export interface GrantRoleFormInputs {
  to: string
  name?: string
  role: Roles
}

const useGrantRoleForm = () => {
  const { t } = useTranslation('nft', {
    keyPrefix: 'settings.roleManager.formErrors',
  })
  const resolver = useYupValidationResolver(
    yup.object({
      to: yup
        .string()
        .required(t('to.required'))
        .isEthereumAddress(t('to.invalid')),
      name: yup.string().optional(),
      role: yup.string().required(t('role.required')),
    })
  )

  return useForm<GrantRoleFormInputs>({
    resolver,
    defaultValues: { role: Roles.ADMIN },
  })
}

export default useGrantRoleForm
