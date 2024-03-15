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
} from './locales/en'

const resources = {
  en: {
    layout: LayoutEn,
    errors: ErrorsEn,
    updateContent: UpdateContentEn,
    project: NftEn,
    token: TokenEn,
    contents: ContentsEn,
    buttons: ButtonsEn,
    projects: NftsEn,
    history: HistoryEn,
    common: CommonEn,
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
