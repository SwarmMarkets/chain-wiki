import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
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
  ExploreEn,
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
    explore: ExploreEn,
  },
}

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
