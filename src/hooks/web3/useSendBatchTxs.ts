import { SafeClientResult } from '@safe-global/sdk-starter-kit'
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants'
import { ReactNode, useState } from 'react'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { PreparedTransaction } from 'thirdweb'
import { useActiveWalletChain } from 'thirdweb/react'
import { useToastManager } from '../useToastManager'
import {
  getExplorerUrl,
  resolveAllThirdwebTransactions,
} from 'src/shared/utils'

type BatchTxsStatus = 'idle' | 'loading' | 'error' | SafeClientTxStatus

type SendBatchTxOptions = {
  successMessage?: ReactNode
  revertMessage?: ReactNode
  errorMessage?: ReactNode
}

const useSendBatchTxs = () => {
  const { smartAccount } = useSmartAccount()
  const { addToast } = useToastManager()
  const chain = useActiveWalletChain()
  const [data, setData] = useState<SafeClientResult>()
  const [status, setStatus] = useState<BatchTxsStatus>('idle')

  const sendBatchTxs = async (
    txs: PreparedTransaction[],
    options?: SendBatchTxOptions
  ) => {
    try {
      setStatus('loading')
      const resolvedTxs = await resolveAllThirdwebTransactions(txs)
      const result = await smartAccount?.send({ transactions: resolvedTxs })

      const successStatueses = [
        SafeClientTxStatus.EXECUTED,
        SafeClientTxStatus.DEPLOYED_AND_EXECUTED,
      ]

      if (result?.status && successStatueses.includes(result?.status)) {
        addToast(options?.successMessage || 'Transaction sent successfully', {
          type: 'success',
          actionHref: getExplorerUrl({
            chainId: chain?.id,
            hash: result?.transactions?.ethereumTxHash,
            type: 'tx',
          }),
          actionText: 'View',
        })
      }
      setStatus(result ? result.status : 'error')
      setData(result)
      return result
    } catch (error) {
      setStatus('error')
      if (error instanceof Error) {
        addToast(
          options?.errorMessage || error.message || 'Transaction failed',
          {
            type: 'error',
          }
        )
      }
      console.log(error)
    }
  }

  return {
    sendBatchTxs,
    data,
    status,
  }
}

export default useSendBatchTxs
