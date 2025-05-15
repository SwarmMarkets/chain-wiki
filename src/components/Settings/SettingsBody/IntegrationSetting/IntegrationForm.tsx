import { useAddress } from '@thirdweb-dev/react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from 'src/components/ui-kit/Button/Button'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import useIntegrationForm, { IntegrationFormInputs } from './useIntegrationForm'
import { parseSummaryToFlatTree } from './utils'
import { IpfsIndexPage, splitTokenId } from 'src/shared/utils'
import { useState } from 'react'
import SidebarTree from 'src/components/common/Layout/ReadLayout/SidebarTree'
import { ISidebarTreeNode } from 'src/components/common/Layout/ReadLayout/SidebarTreeNode'
import { generatePath } from 'react-router-dom'
import RoutePaths from 'src/shared/enums/routes-paths'

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
      const [nftId] = item.tokenId.split('-')
      const to =
        item.type === 'group'
          ? undefined
          : generatePath(RoutePaths.TOKEN_READ, {
              tokenId: item.tokenId,
              nftId,
            })

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

  const account = useAddress()
  const { smartAccountInfo } = useSmartAccount()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useIntegrationForm()
  const onSubmit: SubmitHandler<IntegrationFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { username, repoName, branchName } = data

    try {
      const treeRes = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/git/trees/${branchName}?recursive=1`
      )
      const tree = await treeRes.json()

      const files: Record<string, string> = {}

      for (const file of tree.tree) {
        if (file.type === 'blob') {
          const res = await fetch(file.url)
          const json = await res.json()
          const content = atob(json.content) // base64 decode
          files[file.path] = content
        }
      }

      const summaryContent = files['SUMMARY.md']
      const res = parseSummaryToFlatTree(summaryContent)

      console.log(res, 'RESULT')
      setParsedSummary(res)
      console.log(files)
      onSuccessSubmit()
    } catch (e) {
      console.log(e)
      onErrorSubmit(e)
      // TODO: Add error handler
    }
  }

  const tree = buildTree(parsedSummary, '0')
  console.log(tree)
  console.log(parsedSummary, 'parsedSummary')

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
