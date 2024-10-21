import { SettingView } from '@src/components/Settings/enums'
import NftRoleManager from '../Nft/NftRoleManager'
import { useParams } from 'react-router-dom'
import GeneralSettings from '../Nft/NftView/GeneralSettings'
import EditContent from '../Nft/NftView/EditContent'
import EditHeaderLinks from '../Nft/NftView/EditHeaderLinks'

interface Props {
  activeLink: string
}

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId = '' } = useParams()

  switch (activeLink) {
    default:
    case SettingView.GENERAL:
      return <GeneralSettings nftAddress={nftId} />
    case SettingView.ROLES:
      return <NftRoleManager nftAddress={nftId} />
    case SettingView.CONTENT:
      return <EditContent nftAddress={nftId} />
    case SettingView.LAYOUT:
      return <EditHeaderLinks nftAddress={nftId} />
  }
}

export default SettingsBody
