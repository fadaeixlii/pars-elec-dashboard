import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import events from "@/data/events.json";

interface IEventListContent {
  id: string | number;
  date: string;
  branchName: string;
  branchCode: number;
  eventType: "type1" | "type2" | "type3";
  inputNumber: number;
  userNumber: number;
  userName: string;
}

export interface getEventList {
  params: {
    pageNumber: number;
    pageSize: number;
    userName?: string;
    userNumber?: number;
    eventType?: "type1" | "type2" | "type3";
    branchName?: string;
    branchNumber?: number;
    fromTime?: string;
    toTime?: string;
  };
}

const initialState: {
  loading: boolean;
  isFetch: boolean;
  eventsList: IEventListContent[];
  totalPage: number;
} = {
  loading: false,
  totalPage: 0,
  isFetch: false,
  eventsList: [],
};
export const EventList = createSlice({
  name: "eventsList",
  initialState,
  reducers: {
    setEventList: (state, action) => {
      state.eventsList = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEventList.fulfilled, (state, action) => {
      state.eventsList = [...action.payload.data];
      state.totalPage = action.payload.totalPage;
      state.loading = false;
    });
    builder.addCase(fetchEventList.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(fetchEventList.rejected, (state) => {
      // Add user to the state array
      state.eventsList = [];
      state.loading = false;
    });
  },
});

export const fetchEventList = createAsyncThunk(
  "eventsList/fetchEventList",
  async (d: getEventList) => {
    const {
      pageNumber,
      pageSize,
      userName,
      userNumber,
      eventType,
      branchName,
      branchNumber,
      fromTime,
      toTime,
    } = d.params;

    let filteredEvents = events;

    if (userName) {
      filteredEvents = filteredEvents.filter((event) =>
        event.userName.toLowerCase().includes(userName.toLowerCase())
      );
    }
    if (userNumber) {
      filteredEvents = filteredEvents.filter((event) =>
        event.userNumber
          .toString()
          .toLowerCase()
          .includes(userNumber.toString().toLowerCase())
      );
    }
    if (eventType) {
      filteredEvents = filteredEvents.filter(
        (event) => event.eventType === eventType
      );
    }
    if (branchName) {
      filteredEvents = filteredEvents.filter((event) =>
        event.branchName.toLowerCase().includes(branchName.toLowerCase())
      );
    }
    if (branchNumber) {
      filteredEvents = filteredEvents.filter((event) =>
        event.branchCode
          .toString()
          .toLowerCase()
          .includes(branchNumber.toString().toLowerCase())
      );
    }
    console.log(toTime);
    console.log(fromTime);
    if (fromTime) {
      const fromTimestamp = new Date(fromTime).getTime();
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date).getTime() >= fromTimestamp
      );
    }
    if (toTime) {
      const toTimestamp = new Date(toTime).getTime();
      console.log(toTimestamp);
      filteredEvents = filteredEvents.filter((event) => {
        console.log(new Date(event.date).getTime());
        return new Date(event.date).getTime() <= toTimestamp;
      });
    }

    // Paginate the filtered results
    const totalElements = filteredEvents.length;
    const totalPage = Math.ceil(totalElements / pageSize);
    const startIndex = pageNumber * pageSize;
    const paginatedEvents = filteredEvents.slice(
      startIndex,
      startIndex + pageSize
    );

    // Return the paginated data along with the total page count
    return {
      data: paginatedEvents as IEventListContent[],
      totalPage,
    };
  }
);
export const { setEventList } = EventList.actions;

export default EventList.reducer;
