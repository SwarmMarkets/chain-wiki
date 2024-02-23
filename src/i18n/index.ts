import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  ErrorsEn,
  LayoutEn,
  ProjectEn,
  ArticleEn,
  ContentsEn,
  ButtonsEn,
  UpdateContentEn,
  ProjectsEn,
  HistoryEn,
  CommonEn,
} from './locales/en'

const resources = {
  en: {
    layout: LayoutEn,
    errors: ErrorsEn,
    updateContent: UpdateContentEn,
    project: ProjectEn,
    article: ArticleEn,
    contents: ContentsEn,
    buttons: ButtonsEn,
    projects: ProjectsEn,
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
