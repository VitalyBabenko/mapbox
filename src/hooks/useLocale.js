import { useCallback } from 'react'
import { useLocaleStore } from '../store/localeStore'

export const useLocale = (namespace = '') => {
  const { locale, translations, isInitialized } = useLocaleStore()

  const getNestedTranslation = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }

  const t = useCallback(
    (key, params = {}) => {
      if (!isInitialized) {
        return key
      }

      let finalTranslations = translations

      if (namespace) {
        finalTranslations = getNestedTranslation(translations, namespace)
      }

      if (!finalTranslations) {
        console.warn(`Translations for namespace "${namespace}" not found.`)
        return key
      }

      let message = getNestedTranslation(finalTranslations, key)

      if (message === undefined) {
        console.warn(
          `Translation for key "${key}" in namespace "${namespace}" (${locale}) not found.`,
        )
        return key
      }

      if (params.count !== undefined) {
        const pluralKey = `${key}_plural`
        const pluralMessage = getNestedTranslation(finalTranslations, pluralKey)

        if (params.count > 1 && pluralMessage !== undefined) {
          message = pluralMessage
        }
      }

      for (const paramKey in params) {
        if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
          if (typeof message === 'string') {
            message = message.replace(
              new RegExp(`{{${paramKey}}}`, 'g'),
              params[paramKey],
            )
          }
        }
      }

      return message
    },
    [locale, translations, namespace, isInitialized],
  )

  return { t, locale }
}
