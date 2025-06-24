import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from 'src/components/ui-kit/TextField/TextField'
import { generateSiteLink } from 'src/shared/utils'
import useSetupENSForm, { SetupENSFormInputs } from './useSetupENSForm'
import { generateRedirectHtml } from './utils'

import { encode } from '@ensdomains/content-hash'
import { upload } from 'thirdweb/storage'
import { ethers } from 'ethers'
import { namehash } from 'ethers/lib/utils'
import { useState } from 'react'
import SmartButton from 'src/components/SmartButton'
import staticConfig from 'src/config'
import {
  getENSResolver,
  getENSResolverInterface,
} from 'src/hooks/contracts/getENSResolver'
import { useToastManager } from 'src/hooks/useToastManager'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { ethereum } from 'thirdweb/chains'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'

const { supportedChains } = staticConfig

const SetupENSForm = () => {
  const switchChain = useSwitchActiveWalletChain()
  const { nftId, slug } = useNFTIdParam()

  const { t } = useTranslation('nft', { keyPrefix: 'settings.ens' })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useSetupENSForm()
  const { addToast } = useToastManager()
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit: SubmitHandler<SetupENSFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { domain } = data
    const siteUrl = generateSiteLink(slug || nftId)

    const uploadHtmlToIpfs = async (html: string): Promise<string> => {
      const file = new File([html], 'index.html', { type: 'text/html' })
      const [ipfsUrl] = await upload({
        files: [file],
        client: thirdwebClient,
      })
      return ipfsUrl
    }

    try {
      setSubmitLoading(true)
      const html = generateRedirectHtml(siteUrl)
      const ipfsUrl = await uploadHtmlToIpfs(html)
      const ipfsCid = ipfsUrl.replace('ipfs://', '').split('/')[0]
      const encodedHash = '0x' + encode('ipfs', ipfsCid)

      if (!window.ethereum) throw new Error()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const node = namehash(domain)
      const resolverAddress = await provider.getResolver(domain)
      if (!resolverAddress) throw new Error(t('messages.notOwned'))

      const resolver = getENSResolver(resolverAddress?.address, signer)
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

      const multicallTx = await resolver.multicall([txData, txTextData])

      await multicallTx.wait()

      reset()
      switchChain(supportedChains[0])
      addToast(t('messages.success'), {
        type: 'success',
      })
    } catch (err) {
      addToast(err.message || t('messages.failed'), {
        type: 'error',
      })
      console.error(err)
    } finally {
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
        desiredChain={ethereum}
        type='submit'
        loading={submitLoading}
        className='w-4/12'
      >
        {t('actions.set')}
      </SmartButton>
    </form>
  )
}

export default SetupENSForm
