import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import { Roles } from 'src/shared/enums/roles'
import useNFTRoleManager from './useNFTRoleManager'
import useGrantRoleForm, {
  GrantRoleFormInputs,
} from 'src/hooks/forms/useGrantRoleForm'
import Select from 'src/components/ui-kit/Select/Select'
import Option from 'src/components/ui-kit/Select/Option'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'

interface GrantRoleFormProps {
  nftAddress: string
}

const GrantRoleForm: React.FC<GrantRoleFormProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft')
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useGrantRoleForm()

  const { grantRole, txLoading } = useNFTRoleManager(nftAddress)

  const onSubmit: SubmitHandler<GrantRoleFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { to, role } = data
    return grantRole(to, role)
  }

  const { onChange, ...restRegisterTo } = register('to')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-2 w-full items-start'>
        <TextField
          className='w-6/12'
          inputProps={{
            placeholder: t('roleManager.form.grantRole'),
            onChange,
            ...restRegisterTo,
          }}
          {...restRegisterTo}
          errorMessage={errors.to?.message}
        />
        <div className='w-3/12'>
          <Select<Roles>
            variant='filled'
            value={watch('role')}
            onChange={value => setValue('role', value)}
            className='capitalize'
          >
            {Object.values(Roles).map(role => (
              <Option key={role} value={role} className='capitalize'>
                <div className='flex items-center gap-2'>{role}</div>
              </Option>
            ))}
          </Select>
        </div>

        <Button
          type='submit'
          loading={txLoading}
          className='w-3/12'
          disabled={!isValid}
        >
          {t('roleManager.actions.grantRole')}
        </Button>
      </div>
    </form>
  )
}

export default GrantRoleForm
