import { useCallback } from 'react'
import { PreparedTransaction } from 'thirdweb'
import {
  useActiveWalletChain,
  useSendAndConfirmTransaction,
} from 'thirdweb/react'
import { useToastManager } from '../useToastManager'
import { getExplorerUrl } from 'src/shared/utils'

type SendTxOptions = {
  successMessage?: string
  revertMessage?: string
  errorMessage?: string
}

const useSendTx = () => {
  const { mutateAsync, data, ...result } = useSendAndConfirmTransaction()
  const { addToast } = useToastManager()
  const chain = useActiveWalletChain()

  const sendTx = useCallback(
    async (variables: PreparedTransaction, options: SendTxOptions = {}) => {
      const actionText = 'View'

      const {
        successMessage = 'Transaction sent successfully',
        revertMessage = 'Transaction reverted',
        errorMessage = 'Transaction failed',
      } = options

      try {
        const res = await mutateAsync(variables)

        const actionHref = getExplorerUrl({
          chainId: chain?.id,
          hash: res?.transactionHash,
          type: 'tx',
        })

        switch (res.status) {
          case 'success':
            addToast(successMessage, {
              type: 'success',
              actionHref,
              actionText,
            })
            break
          case 'reverted':
            addToast(revertMessage, {
              type: 'warn',
            })
            break
        }

        return res
      } catch (e) {
        addToast(e.message || errorMessage, {
          type: 'error',
        })
      }
    },
    [addToast, chain?.id, mutateAsync]
  )

  return {
    sendTx,
    receipt: data,
    ...result,
  }
}

export default useSendTx
