import { SettingView } from '@src/components/Settings/enums'
import NftRoleManager from '../Nft/NftRoleManager'
import { useParams } from 'react-router-dom'
import GeneralSettings from '../Nft/NftView/GeneralSettings'
import EditContent from '../Nft/NftView/EditContent'

interface Props {
  activeLink: string
}

const LayoutComponent = () => <div>Layout Component</div>

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId = '' } = useParams()
  switch (activeLink) {
    default:
    case SettingView.GENERAL:
      return <GeneralSettings />
    case SettingView.PREFERENCES:
    case SettingView.ROLES:
      return <NftRoleManager nftAddress={nftId} />
    case SettingView.CONTENT:
      return <EditContent />
    case SettingView.LAYOUT:
      return <LayoutComponent />
  }
}

export default SettingsBody

