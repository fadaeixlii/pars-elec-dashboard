import i18Next from '@/Translation/i18n'
import { Http } from '@/services/axios/axios.config'
import i18next from 'i18next'
import localStorageHelper from './localStorageHelper'

function changeLang(lang: string): any {
  i18Next.changeLanguage(lang).then(() => {
    i18Next.options.lng = lang
  })
}

export const settingHelper = {
  setDarkMode: (value: 'dark' | 'light') => {
    localStorageHelper.setDarkMode(value)
    const htmlElement = document.documentElement

    if (
      value === 'dark' ||
      (!('DarkMode' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      htmlElement.classList.add('dark')
      htmlElement.setAttribute('data-mode', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      htmlElement.setAttribute('data-mode', '')
    }
  },
  setLanguage: async (value: 'en' | 'fa') => {
    localStorageHelper.setLang(value)
    changeLang(value)
    Object.values(Http).map((e) => {
      e.interceptors.request.use(function (config) {
        config.headers['Accept-Language'] = value
        return config
      })
    })
    await i18next.changeLanguage(value)
    const htmlElement = document.documentElement
    htmlElement.setAttribute('Accept-Language', value)

    if (value === 'fa') {
      htmlElement.setAttribute('dir', 'rtl')
    } else {
      htmlElement.setAttribute('dir', 'ltr')
    }
  },
  setAssetHide: (value: 'hide' | 'visible') => {
    localStorageHelper.setHideAsset(value)
  },
  toggleAssetHide: () => {
    const value = localStorageHelper.getHideAsset()
    localStorageHelper.setHideAsset(value === 'hide' ? 'visible' : 'hide')
  },
  toggleLocalHttp: () => {
    const value = localStorageHelper.getLocalHttp()
    localStorageHelper.setLocalHttp(value === 'local' ? 'product' : 'local')
  },
  setLocalHttp: (value: 'product' | 'local') => {
    localStorageHelper.setLocalHttp(value)
  },
  setCurrency: (value: string) => {
    localStorageHelper.setCurrency(value)
  },
}
