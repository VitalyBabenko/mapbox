import { create } from 'zustand'

import enTranslations from '../locales/en.json'
import frTranslations from '../locales/fr.json'

const allTranslations = {
  en: enTranslations,
  fr: frTranslations,
}

export const useLocaleStore = create((set, get) => ({
  locale: 'en',
  translations: {},
  isInitialized: false,

  setLocale: newLocale => set({ locale: newLocale }),
  setTranslations: newTranslations => set({ translations: newTranslations }),

  initializeLocale: () => {
    const { isInitialized } = get()
    if (!isInitialized) {
      // const htmlLang = document.querySelector('html').lang
      const htmlLang = 'fr'
      const initialLocale = ['en', 'fr'].includes(htmlLang) ? htmlLang : 'en'

      set({
        locale: initialLocale,
        translations: allTranslations[initialLocale],
        isInitialized: true,
      })
    }
  },
}))
