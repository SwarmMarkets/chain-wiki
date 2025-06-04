import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SidebarTree from 'src/components/common/Layout/ReadLayout/SidebarTree'
import { ISidebarTreeNode } from 'src/components/common/Layout/ReadLayout/SidebarTreeNode'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import { IpfsIndexPage } from 'src/shared/utils'
import useIntegrationForm from './useIntegrationForm'

interface IntegrationFormProps {
  onSuccessSubmit(): void
  onErrorSubmit(e: Error): void
}

const buildTree = (
  items: IpfsIndexPage[],
  parentId?: number | string
): ISidebarTreeNode[] => {
  return items
    .filter(item => item.parent === parentId)
    .map(item => {
      const to = ''
      return {
        ...item,
        children: buildTree(items, item.tokenId),
        to,
      }
    })
}

const IntegrationForm: React.FC<IntegrationFormProps> = ({
  onSuccessSubmit,
  onErrorSubmit,
}) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })
  const [parsedSummary, setParsedSummary] = useState<IpfsIndexPage[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useIntegrationForm({
    onSuccessSubmit: pages => {
      setParsedSummary(pages)
      onSuccessSubmit()
    },
    onErrorSubmit,
  })

  const tree = buildTree(parsedSummary, '0')

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className='typo-body1'>{t('form.username')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.username'),
            ...register('username'),
          }}
          errorMessage={errors.username?.message}
        />
      </div>
      <div>
        <p className='typo-body1'>{t('form.repoName')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.repoName'),
            ...register('repoName'),
          }}
          errorMessage={errors.repoName?.message}
        />
      </div>
      <div>
        <p className='typo-body1'>{t('form.branchName')}</p>
        <TextField
          inputProps={{
            placeholder: t('formPlaceholders.branchName'),
            ...register('branchName'),
          }}
          errorMessage={errors.branchName?.message}
        />
      </div>

      <Button type='submit'>{t('form.submit')}</Button>
      <SidebarTree data={tree} selectedId={''} />
    </form>
  )
}

export default IntegrationForm
