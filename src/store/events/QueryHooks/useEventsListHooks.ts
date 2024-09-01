import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import type { getEventList } from "../Reducers/eventsList.reducer";
import { fetchEventList } from "../Reducers/eventsList.reducer";

export const useEventsListHook = () => {
  const dispatch = useDispatch();

  const { eventsList, loading, totalPage } = useSelector(
    (state: RootState) => state.eventsList
  );

  const fetchEventListCallback = useCallback(
    (d: getEventList) => {
      dispatch(fetchEventList(d) as any);
    },
    [dispatch]
  );

  return {
    fetchEventListCallback,
    eventsList,
    loading,
    totalPage,
  };
};
