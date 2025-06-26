import Button from 'src/components/ui-kit/Button/Button'
import {
  ConnectButton,
  ConnectButtonProps,
  useActiveAccount,
} from 'thirdweb/react'
import { shortenAddress } from 'thirdweb/utils'

const ConnectWalletDesktop: React.FC<ConnectButtonProps> = ({ ...props }) => {
  const account = useActiveAccount()
  const address = account?.address || ''

  return (
    <ConnectButton
      connectButton={{
        style: { height: 40, lineHeight: '12px' },
      }}
      detailsButton={{
        render() {
          return (
            <Button className='px-6' variant='outlined'>
              {shortenAddress(address)}
            </Button>
          )
        },
      }}
      {...props}
    />
  )
}

export default ConnectWalletDesktop
