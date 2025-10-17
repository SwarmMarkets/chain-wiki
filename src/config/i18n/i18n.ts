import { createInstance, i18n, Resource, ResourceKey } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from 'src/config/i18n/i18nConfig'

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource
): Promise<{
  i18n: i18n
  resources: Record<string, Record<string, ResourceKey>>
  t: i18n['t']
}> {
  const instance = i18nInstance || createInstance()

  instance.use(initReactI18next)

  if (!resources) {
    instance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`public/locales/${language}/${namespace}.json`)
      )
    )
  }

  await instance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  })

  return {
    i18n: instance,
    resources: { [locale]: instance.services.resourceStore.data[locale] },
    t: instance.t.bind(instance),
  }
}
