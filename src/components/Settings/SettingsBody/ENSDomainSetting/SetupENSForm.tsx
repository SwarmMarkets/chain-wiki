import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import TextField from 'src/components/ui-kit/TextField/TextField'
import { generateSiteLink } from 'src/shared/utils'
import useSetupENSForm, { SetupENSFormInputs } from './useSetupENSForm'
import { generateRedirectHtml } from './utils'

import { encode } from '@ensdomains/content-hash'
import { ethers } from 'ethers'
import { namehash } from 'ethers/lib/utils'
import SmartButton from 'src/components/SmartButton'
import { useStorageUpload, useSwitchChain } from '@thirdweb-dev/react'
import staticConfig from 'src/config'
import { useToastManager } from 'src/hooks/useToastManager'
import { useState } from 'react'

const resolverAbi = [
  'function setContenthash(bytes32 node, bytes calldata hash) external',
]

const { supportedChains } = staticConfig

const SetupENSForm = () => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings.ens' })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useSetupENSForm()
  const { mutateAsync: upload } = useStorageUpload()
  const switchChain = useSwitchChain()
  const { addToast } = useToastManager()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<SetupENSFormInputs> = async (data, e) => {
    e?.preventDefault()
    const { domain } = data
    const targetUrl = generateSiteLink(nftId)

    const uploadHtmlToIpfs = async (html: string): Promise<string> => {
      const file = new File([html], 'index.html', { type: 'text/html' })
      const [ipfsUrl] = await upload({ data: [file] })
      return ipfsUrl
    }

    try {
      setLoading(true)
      const html = generateRedirectHtml(targetUrl)
      const ipfsUrl = await uploadHtmlToIpfs(html)
      const ipfsCid = ipfsUrl.replace('ipfs://', '').split('/')[0]
      const encodedHash = '0x' + encode('ipfs', ipfsCid)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      const node = namehash(domain)
      const resolverAddress = await provider.getResolver(domain)
      if (!resolverAddress) throw new Error(t('messages.notOwned'))

      const resolver = new ethers.Contract(
        resolverAddress.address,
        resolverAbi,
        signer
      )

      const tx = await resolver.setContenthash(node, encodedHash)
      await tx.wait()

      reset()
      switchChain(supportedChains[0].chainId)

      addToast(t('messages.success'), {
        type: 'success',
      })
    } catch (err) {
      addToast(err.message || t('messages.failed'), {
        type: 'error',
      })
      console.error(err)
    } finally {
      setLoading(false)
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
        desiredChainId={1}
        type='submit'
        loading={loading}
        className='w-4/12'
      >
        {t('actions.set')}
      </SmartButton>
    </form>
  )
}

export default SetupENSForm
