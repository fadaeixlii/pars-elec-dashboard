import { openDB, type IDBPDatabase } from 'idb'

export const DB_NAME = 'my-app-db'
export const STORE_NAME = 'api-cache'

let dbPromise: Promise<IDBPDatabase<any>> | null = null

const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' })
        }
      },
    })
  }
  return dbPromise
}

export const saveToIndexedDB = async (key: string, data: any) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.put({ key, data })
  await tx.done
}

export const loadFromIndexedDB = async (key: string) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const result = await store.get(key)
  await tx.done
  return result?.data || null
}

export const deleteFromIndexedDB = async (key: string) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  await store.delete(key)
  await tx.done
}
