import { customLocalStorage } from './CustomLocalStorage'

const localStorageHelper = {
  setToken(token: string, expire: number) {
    customLocalStorage.setItem('token', token, expire)
  },
  getToken() {
    return customLocalStorage.getItem('token')
  },
  removeToken() {
    customLocalStorage.removeItem('token')
  },
  setVerifyToken(token: string, expire: number) {
    customLocalStorage.setItem('verifyToken', token, expire)
  },
  getVerifyToken() {
    return customLocalStorage.getItem('verifyToken')
  },
  removeVerifyToken() {
    customLocalStorage.removeItem('verifyToken')
  },
  setHashKey(token: string, expire: number) {
    customLocalStorage.setItem('hashKey', token, expire)
  },
  getHashKey() {
    return customLocalStorage.getItem('hashKey')
  },
  removeHashKey() {
    customLocalStorage.removeItem('hashKey')
  },
  setMyHashKey(token: string, expire: number) {
    customLocalStorage.setItem('myHashKey', token, expire)
  },
  getMyHashKey() {
    return customLocalStorage.getItem('myHashKey')
  },
  removeMyHashKey() {
    customLocalStorage.removeItem('myHashKey')
  },
  setLastSecret(token: string, expire: number) {
    customLocalStorage.setItem('lastSecret', token, expire)
  },
  getLastSecret() {
    return customLocalStorage.getItem('lastSecret')
  },
  removeLastSecret() {
    customLocalStorage.removeItem('lastSecret')
  },
  setDarkMode(token: string) {
    customLocalStorage.setItem('DarkMode', token, 10000000000000000000000)
  },
  getDarkMode() {
    return customLocalStorage.getItem('DarkMode')
  },
  removeDarkMode() {
    customLocalStorage.removeItem('DarkMode')
  },
  setLang(token: 'en' | 'fa') {
    customLocalStorage.setItem('Lang', token, 10000000000000000000000)
  },
  getLang() {
    return customLocalStorage.getItem('Lang')
  },
  removeLang() {
    customLocalStorage.removeItem('Lang')
  },
  setHideAsset(token: 'hide' | 'visible') {
    customLocalStorage.setItem('HideAsset', token, 10000000000000000000000)
  },
  getHideAsset() {
    return customLocalStorage.getItem('HideAsset') as 'hide' | 'visible'
  },
  removeHideAsset() {
    customLocalStorage.removeItem('HideAsset')
  },
  setLocalHttp(token: 'local' | 'product') {
    customLocalStorage.setItem('LocalHttp', token, 10000000000000000000000)
  },
  getLocalHttp() {
    return customLocalStorage.getItem('LocalHttp') as 'local' | 'product'
  },
  removeLocalHttp() {
    customLocalStorage.removeItem('LocalHttp')
  },
  setCurrency(token: string) {
    customLocalStorage.setItem('Currency', token, 10000000000000000000000)
  },
  getCurrency() {
    return customLocalStorage.getItem('Currency') as string
  },
  removeCurrency() {
    customLocalStorage.removeItem('Currency')
  },
}

export default localStorageHelper
