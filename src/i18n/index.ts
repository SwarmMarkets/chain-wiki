import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { CreateProjectEn, ErrorsEn, LayoutEn, ProjectEn, ArticleEn, ContentsEn, ButtonsEn, ProjectsEn } from './locales/en'


const resources = {
  en: {
    layout: LayoutEn,
    errors: ErrorsEn,
    createProject: CreateProjectEn,
    project: ProjectEn,
    article: ArticleEn,
    contents: ContentsEn,
    buttons: ButtonsEn,
    projects: ProjectsEn,
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
