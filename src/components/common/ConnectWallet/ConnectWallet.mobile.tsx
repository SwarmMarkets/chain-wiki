import ChildWithBadge from 'src/components/ui-kit/ChildWithBadge'
import IconButton from 'src/components/ui-kit/IconButton'
import {
  ConnectButton,
  ConnectButtonProps,
  useActiveAccount,
  useActiveWallet,
  useWalletImage,
} from 'thirdweb/react'
import AccountImage from '../AccountImage'

const ConnectWalletMobile: React.FC<ConnectButtonProps> = ({ ...props }) => {
  const account = useActiveAccount()
  const wallet = useActiveWallet()
  const { data: image } = useWalletImage(wallet?.id)

  return (
    <ConnectButton
      connectButton={{
        style: { height: 40, minWidth: 'unset' },
      }}
      detailsButton={{
        render() {
          return (
            <ChildWithBadge badgeIcon={<img src={image} />} badgeSize={18}>
              <IconButton>
                <AccountImage address={account?.address} />
              </IconButton>
            </ChildWithBadge>
          )
        },
      }}
      {...props}
    />
  )
}

export default ConnectWalletMobile
