'use client'

import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useEditIndexPageForm, {
  EditIndexPageFormInputs,
} from 'src/hooks/forms/useEditIndexPageForm'
import TextField from '../ui-kit/TextField/TextField'
import Button from '../ui-kit/Button/Button'

interface EditIndexPageFormProps {
  initialValues: EditIndexPageFormInputs
  onSubmit: SubmitHandler<EditIndexPageFormInputs>
  onCancel?: () => void
}

const EditIndexPageForm: React.FC<EditIndexPageFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages.editPage' })
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useEditIndexPageForm(initialValues)

  const name = watch('name')
  const slug = watch('slug')

  return (
    <div>
      <h1 className='mb-1 text-center'>{t('title')}</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-1'>
          <p className='typo-body1'>{t('form.name.label')}</p>
          <TextField
            inputProps={{
              placeholder: t('form.name.placeholder'),
              ...register('name'),
            }}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='typo-body1'>{t('form.slug.label')}</p>
          <TextField
            inputProps={{
              placeholder: t('form.slug.placeholder'),
              ...register('slug'),
            }}
            errorMessage={errors.slug?.message}
          />
          <span>{t('form.slug.help')}</span>
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outlined' onClick={onCancel}>
            {t('buttons.cancel')}
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={!isDirty || !isValid || !name || !slug}
          >
            {t('buttons.save')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditIndexPageForm
