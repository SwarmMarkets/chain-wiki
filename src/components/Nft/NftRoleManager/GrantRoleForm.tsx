import { useTranslation } from 'react-i18next'
import { SubmitHandler } from 'react-hook-form'
import { Roles } from 'src/shared/enums/roles'
import useGrantRoleForm, {
  GrantRoleFormInputs,
} from 'src/hooks/forms/useGrantRoleForm'
import Select from 'src/components/ui-kit/Select/Select'
import Option from 'src/components/ui-kit/Select/Option'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import { useAddressNameStore } from './addressNameStore'
import useNFTRoleManager from './useNFTRoleManager'

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
      setAddressName(to, role, name)
    }

    reset()
  }

  const { onChange: onChangeAddress, ...restRegisterTo } = register('to')
  const { onChange: onChangeName, ...restRegisterName } = register('name')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2 w-full items-start'>
        <TextField
          className='w-full'
          label={t('roleManager.form.grantRole')}
          inputProps={{
            placeholder: t('roleManager.form.grantRole'),
            onChange: onChangeAddress,
            ...restRegisterTo,
          }}
          errorMessage={errors.to?.message}
        />
        <div className='flex gap-2 w-full'>
          <TextField
            className='w-4/12'
            label={t('roleManager.form.name')}
            inputProps={{
              placeholder: t('roleManager.formPlaceholders.name'),
              onChange: onChangeName,
              ...restRegisterName,
            }}
          />
          <div
            className='w-4/12 flex items-stretch'
            onClick={e => e.preventDefault()}
          >
            <Select<Roles>
              option='filled'
              value={watch('role')}
              onChange={value => setValue('role', value)}
              className='capitalize w-full flex-grow'
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
            className='w-4/12 h-10'
            disabled={!isValid}
          >
            {t('roleManager.actions.grantRole')}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default GrantRoleForm
