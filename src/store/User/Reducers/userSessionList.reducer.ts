import { Http } from "@/services/axios/axios.config";
import type { IUserSessionListContent } from "@/types/user";
import { Urls } from "@/utils/Address";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getUserSessionList {
  params: {
    pageNumber: number;
    pageSize: number;
  };
}

const initialState: {
  loading: boolean;
  isFetch: boolean;
  userSessionList: IUserSessionListContent[];
  totalPage: number;
} = {
  loading: false,
  totalPage: 0,
  isFetch: false,
  userSessionList: [],
};
export const UserSessionList = createSlice({
  name: "userSessionList",
  initialState,
  reducers: {
    setUserSessionList: (state, action) => {
      state.userSessionList = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserSessionList.fulfilled, (state, action) => {
      state.userSessionList = [...action.payload.data];
      state.totalPage = action.payload.totalPage;
      state.loading = false;
    });
    builder.addCase(fetchUserSessionList.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(fetchUserSessionList.rejected, (state) => {
      // Add user to the state array
      state.userSessionList = [];
      state.loading = false;
    });
  },
});

export const fetchUserSessionList = createAsyncThunk(
  "userSessionList/fetchUserSessionList",
  async (d: getUserSessionList) => {
    const { params } = d;
    const { data } = await Http.authLocalSSO.get(`/${Urls.USER_SESSION_LIST}`, {
      params,
    });
    return {
      data: data.body as IUserSessionListContent[],
      totalPage: data.totalPages,
    };
  }
);
export const { setUserSessionList } = UserSessionList.actions;

export default UserSessionList.reducer;
