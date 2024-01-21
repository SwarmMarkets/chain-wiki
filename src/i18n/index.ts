import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LayoutEn } from './locales/en'


const resources = {
  en: {
    layout: LayoutEn,
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
