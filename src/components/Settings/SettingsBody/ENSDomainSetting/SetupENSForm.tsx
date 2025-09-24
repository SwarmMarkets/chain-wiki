import { encode } from '@ensdomains/content-hash'
import { ethers } from 'ethers'
import { namehash } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { SubmitHandler, UseFormReturn, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SmartButton from 'src/components/SmartButton'
import TextField from 'src/components/ui-kit/TextField/TextField'
import staticConfig from 'src/config'
import {
  getENSResolver,
  getENSResolverInterface,
} from 'src/hooks/contracts/ens/getENSResolver'
import useSX1155NFTFactory from 'src/hooks/contracts/factory/useSX1155NFTFactory'
import useNFT from 'src/hooks/subgraph/useNFT'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'
import useSendTx from 'src/hooks/web3/useSendTx'
import { generateSiteLink } from 'src/shared/utils'
import { multicall } from 'src/thirdweb/ens-resolver'
import { Address } from 'thirdweb'
import { ethereum } from 'thirdweb/chains'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import { SetupENSFormInputs } from './useSetupENSForm'
import { generateRedirectHtml } from './utils'

interface SetupENSFormProps {
  isOwner: boolean
  form: UseFormReturn<SetupENSFormInputs, any, SetupENSFormInputs>
  ownerLoading: boolean
}

const SetupENSForm: React.FC<SetupENSFormProps> = ({
  isOwner,
  form,
  ownerLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setError,
  } = form

  const switchChain = useSwitchActiveWalletChain()
  const { nftId } = useNFTIdParam()
  const { nft } = useNFT(nftId, { disableRefetch: true })
  const { prepareUpdateChainWikiSlugTx } = useSX1155NFTFactory()

  const { t } = useTranslation('nft', { keyPrefix: 'settings.ens' })

  const { mutateAsync: upload } = useIpfsUpload()
  const [submitLoading, setSubmitLoading] = useState(false)
  const { sendTx } = useSendTx()

  const domain = useWatch({ control: form.control, name: 'domain' })

  const slugAndDomainMatch = nft?.slug === domain

  useEffect(() => {
    if (!domain) {
      clearErrors('domain')
      return
    }

    if (!isOwner && domain.endsWith('.eth')) {
      setError('domain', {
        type: 'manual',
        message: t('messages.notOwned') as string,
      })
    } else {
      clearErrors('domain')
    }
  }, [domain, isOwner, setError, clearErrors, t])

  const onSubmit: SubmitHandler<SetupENSFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { domain } = data

    const uploadHtmlToIpfs = async (html: string): Promise<string> => {
      const file = new File([html], 'index.html', { type: 'text/html' })
      const ipfsUrl = (await upload([file])) as string
      return ipfsUrl
    }

    try {
      setSubmitLoading(true)
      // Slug check & optional update (separate from ENS connection)
      const currentSlug = nft?.slug || ''
      if (currentSlug !== domain) {
        const updateSlugTx = prepareUpdateChainWikiSlugTx({
          chainWiki: nftId,
          slug: domain,
        })
        if (updateSlugTx) {
          await sendTx(updateSlugTx, {
            successMessage: 'Slug updated',
          })
          return
        }
      }

      // ENS connection (after slug update). Switch network if necessary
      await switchChain(ethereum)

      const siteUrl = generateSiteLink({ nftIdOrSlug: domain })

      const html = generateRedirectHtml(siteUrl)
      const ipfsUrl = await uploadHtmlToIpfs(html)
      const ipfsCid = ipfsUrl.replace('ipfs://', '').split('/')[0]
      const encodedHash = '0x' + encode('ipfs', ipfsCid)

      if (!window.ethereum) throw new Error('No provider')
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const resolverAddress = await provider.getResolver(domain)

      if (!resolverAddress) throw new Error(t('messages.failed'))

      const node = namehash(domain)

      const resolver = getENSResolver(resolverAddress?.address)
      const resolverInterface = getENSResolverInterface()
      const txData = resolverInterface.encodeFunctionData('setContenthash', [
        node,
        encodedHash,
      ])

      const txTextData = resolverInterface.encodeFunctionData('setText', [
        node,
        'chainwiki_url',
        siteUrl,
      ])

      const multicallTx = multicall({
        data: [txData as Address, txTextData as Address],
        contract: resolver,
      })

      await sendTx(multicallTx, {
        successMessage: t('messages.success'),
        errorMessage: t('messages.failed'),
      })

      reset()
    } finally {
      await switchChain(staticConfig.defaultChain)
      setSubmitLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex gap-2 w-full items-start'
    >
      <TextField
        className='w-8/12'
        inputProps={{
          placeholder: t('formPlaceholders.domain'),
          ...register('domain'),
        }}
        errorMessage={errors.domain?.message}
      />
      <SmartButton
        type='submit'
        loading={submitLoading || ownerLoading}
        disabled={!isOwner}
        className='w-4/12'
      >
        {slugAndDomainMatch ? t('actions.set') : t('actions.updateSlug')}
      </SmartButton>
    </form>
  )
}

export default SetupENSForm
