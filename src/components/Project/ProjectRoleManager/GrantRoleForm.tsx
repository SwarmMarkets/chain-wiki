import Box from '@src/components/ui/Box'
import LoadingButton from '@src/components/ui/Button/LoadingButton'
import Flex from '@src/components/ui/Flex'
import { Select } from '@src/components/ui/Select'
import Text from '@src/components/ui/Text'
import { Roles } from '@src/shared/enums/roles'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyledTextField } from './styled-components'
import useNFTRoleManager from './useNFTRoleManager'
import useGrantRoleForm, {
  GrantRoleFormInputs,
} from '@src/hooks/forms/useGrantRoleForm'

interface GrantRoleFormProps {
  projectAddress: string
}

const GrantRoleForm: React.FC<GrantRoleFormProps> = ({ projectAddress }) => {
  const { t } = useTranslation('project')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useGrantRoleForm()

  const { grantRole, txLoading } = useNFTRoleManager(projectAddress)

  const onSubmit: SubmitHandler<GrantRoleFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { to, role } = data
    return grantRole(to, role)
  }

  return (
    <Flex
      as='form'
      alignItems='flex-end'
      flexDirection='row'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box maxWidth='400px' width='100%' mr={3}>
        <Text.h3 mb={2}>{t('roleManager.form.grantRole')}</Text.h3>
        <StyledTextField
          width='100%'
          inputProps={register('to', { required: true })}
          placeholder={t('roleManager.formPlaceholders.grantRole')}
          error={errors.to?.message}
        />
      </Box>

      <Box mr={3}>
        <Select defaultValue='' {...register('role', { required: true })}>
          <option value='' disabled hidden>
            {t('roleManager.formPlaceholders.role')}
          </option>
          {Object.values(Roles).map(role => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </Select>
      </Box>
      <LoadingButton width='100px' height='40px' loading={txLoading}>
        {t('roleManager.actions.grantRole')}
      </LoadingButton>
    </Flex>
  )
}

export default GrantRoleForm
