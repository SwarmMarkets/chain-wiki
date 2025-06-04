import { useTranslation } from 'react-i18next'
import yup from 'src/shared/validations/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolvber'
import { useAddress } from '@thirdweb-dev/react'
import { parseSummaryToFlatTree } from './utils'
import { useParams } from 'react-router-dom'
import { IpfsIndexPage } from 'src/shared/utils'
import { fetchRepoFiles, fetchRepoTree } from 'src/services/github'

export interface IntegrationFormInputs {
  username: string
  repoName: string
  branchName: string
}

interface UseIntefrationFormArgs {
  onSuccessSubmit: (indexPages: IpfsIndexPage[]) => void
  onErrorSubmit(e: Error): void
}

const useIntegrationForm = ({
  onSuccessSubmit,
  onErrorSubmit,
}: UseIntefrationFormArgs) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings.import' })

  const account = useAddress()

  const resolver = useYupValidationResolver(
    yup.object({
      username: yup.string().required(t('formErrors.username.required')),
      repoName: yup.string().required(t('formErrors.repoName.required')),
      branchName: yup.string().required(t('formErrors.branchName.required')),
    })
  )

  const form = useForm<IntegrationFormInputs>({ resolver })

  const onSubmit: SubmitHandler<IntegrationFormInputs> = async (data, e) => {
    e?.preventDefault()
    if (!account) return

    const { username, repoName, branchName } = data

    try {
      const tree = await fetchRepoTree(username, repoName, branchName)
      const files = await fetchRepoFiles(tree)
      const summaryContent = files['SUMMARY.md']
      const result = parseSummaryToFlatTree(summaryContent, nftId, 0)

      onSuccessSubmit(result)
    } catch (e) {
      console.log(e)
      onErrorSubmit(e)
    }
  }

  return { ...form, onSubmit }
}

export default useIntegrationForm
