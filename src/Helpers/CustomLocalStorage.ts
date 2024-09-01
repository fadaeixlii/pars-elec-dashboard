type TResult = {
  data: string
  expireTime: number
} | null

export const customLocalStorage = {
  getItem(key: string) {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    const result: TResult = JSON.parse(localStorage.getItem(key) ?? '')
    if (result) {
      if (result.expireTime <= Date.now()) {
        localStorage.removeItem(key)
        return null
      }
      return result.data
    }
    return null
  },

  setItem(key: string, value: string, maxAge = 30 * 30 * 60 * 1000) {
    const result: TResult = {
      data: value,
      expireTime: Date.now() + maxAge,
    }

    localStorage.setItem(key, JSON.stringify(result))
  },
  removeItem(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
