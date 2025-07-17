import SafeApiKit from '@safe-global/api-kit'
import Safe, {
  Eip1193Provider,
  SafeConfigWithPredictedSafe,
  SafeConfigWithSafeAddress,
} from '@safe-global/protocol-kit'
import { SafeClient } from '@safe-global/sdk-starter-kit'
import { BaseClient } from '@safe-global/sdk-starter-kit/dist/src/BaseClient'

export const safeTxServiceUrl = 'https://safe-transaction-mainnet.safe.global'

export const initSafeClient = async (
  accountAddress: string,
  chainId: string | number
): Promise<SafeClient | null> => {
  if (!accountAddress || !chainId) return null

  const safeConfig: SafeConfigWithPredictedSafe | SafeConfigWithSafeAddress = {
    provider: window.ethereum as Eip1193Provider,
    signer: accountAddress,
    predictedSafe: {
      safeAccountConfig: {
        owners: [accountAddress],
        threshold: 1,
      },
    },
  }

  try {
    let protocolKit = (await Safe.init(
      safeConfig
    )) as unknown as BaseClient['protocolKit']

    const isDeployed = await protocolKit.isSafeDeployed()
    if (isDeployed) {
      const safeAddress = await protocolKit.getAddress()
      protocolKit = await protocolKit.connect({
        provider: window.ethereum  as Eip1193Provider,
        signer: accountAddress,
        safeAddress,
      })
    }

    const apiKit = new SafeApiKit({
      chainId: BigInt(chainId),
      txServiceUrl: safeTxServiceUrl,
    })

    return new SafeClient(protocolKit, apiKit)
  } catch (e) {
    console.log(e)
  }

  return null
}
