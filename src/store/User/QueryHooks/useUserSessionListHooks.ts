import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadFromIndexedDB } from '@/Helpers/IDBHelper'
import type { RootState } from '@/store'
import { Urls } from '@/utils/Address'
import getFilteredParams from '@/utils/FilteredParams'
import type { getUserSessionList } from '../Reducers/userSessionList.reducer'
import {
  fetchUserSessionList,
  setUserSessionList,
} from '../Reducers/userSessionList.reducer'

export const useGetUserSessionListHook = () => {
  const dispatch = useDispatch()

  const { userSessionList, loading, totalPage, isFetch } = useSelector(
    (state: RootState) => state.userSessionList,
  )
  const fetchFromCache = useCallback(
    async (params: getUserSessionList) => {
      const cachedData = await loadFromIndexedDB(
        `/${Urls.USER_SESSION_LIST}?${new URLSearchParams({ ...(getFilteredParams(params.params) as any) }).toString()}`,
      )

      if (cachedData) {
        dispatch(setUserSessionList(cachedData.body))
      }
    },
    [dispatch],
  )
  const fetchUserSessionListCallback = useCallback(
    (d: getUserSessionList) => {
      if (!isFetch)
        fetchFromCache(d).finally(() => {
          dispatch(fetchUserSessionList(d) as any)
        })
    },
    [dispatch],
  )

  return {
    fetchUserSessionListCallback,
    userSessionList,
    loading,
    totalPage,
  }
}
