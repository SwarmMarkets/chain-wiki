import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  ErrorsEn,
  LayoutEn,
  NftEn,
  TokenEn,
  ContentsEn,
  ButtonsEn,
  UpdateContentEn,
  NftsEn,
  HistoryEn,
  CommonEn,
  ConnectWalletEn,
  EditEn,
} from './locales/en'

const resources = {
  en: {
    layout: LayoutEn,
    errors: ErrorsEn,
    updateContent: UpdateContentEn,
    nft: NftEn,
    token: TokenEn,
    contents: ContentsEn,
    buttons: ButtonsEn,
    nfts: NftsEn,
    history: HistoryEn,
    common: CommonEn,
    connectWallet: ConnectWalletEn,
    edit: EditEn,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
