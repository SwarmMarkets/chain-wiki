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
import { useAddressNameStore } from './addressNameStore'

interface GrantRoleFormProps {
  nftAddress: string
}

const GrantRoleForm: React.FC<GrantRoleFormProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft')
  const { setAddressName } = useAddressNameStore()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useGrantRoleForm()

  const { grantRole, txLoading } = useNFTRoleManager(nftAddress)

  const onSubmit: SubmitHandler<
    GrantRoleFormInputs & { name?: string }
  > = async (data, e) => {
    e?.preventDefault()

    const { to, role, name } = data
    const success = await grantRole(to, role)

    if (success && name) {
      setAddressName(to, name)
    }

    reset()
  }

  const { onChange: onChangeAddress, ...restRegisterTo } = register('to')
  const { onChange: onChangeName, ...restRegisterName } = register('name')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-2 w-full items-start'>
        <TextField
          className='w-4/12'
          label={t('roleManager.form.address')}
          inputProps={{
            placeholder: t('roleManager.form.grantRole'),
            onChange: onChangeAddress,
            ...restRegisterTo,
          }}
          {...restRegisterTo}
          errorMessage={errors.to?.message}
        />
        <TextField
          className='w-4/12'
          label={t('roleManager.form.name')}
          inputProps={{
            placeholder: t('roleManager.form.enterName'),
            onChange: onChangeName,
            ...restRegisterName,
          }}
          {...restRegisterName}
        />
        <div className='w-2/12' onClick={e => e.preventDefault()}>
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
          className='w-2/12'
          disabled={!isValid}
        >
          {t('roleManager.actions.grantRole')}
        </Button>
      </div>
    </form>
  )
}

export default GrantRoleForm
