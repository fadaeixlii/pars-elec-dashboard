import EnhancedTable, { createData } from "@/components/utils/Table";

import * as React from "react";

import { useEventsListHook } from "@/store/events/QueryHooks/useEventsListHooks";
import useModal from "@/components/utils/Modal";
import { EventFiltersModal } from "./EventFiltersModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
export interface IListEventsTableProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ListEventsTable() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const [userName, setUserName] = React.useState("");

  const [branchName, setBranchName] = React.useState("");

  const [userNumber, setUserNumber] = React.useState<number | null>();

  const [branchNumber, setBranchNumber] = React.useState<number | null>();

  const [eventType, setEventType] = React.useState<
    "type1" | "type2" | "type3" | null
  >();

  const [toTime, setToTime] = React.useState("");
  const [fromTime, setFromTime] = React.useState("");

  const { fetchEventListCallback, loading, eventsList, totalPage } =
    useEventsListHook();

  const fetch = React.useCallback(
    (close?: boolean) => {
      fetchEventListCallback({
        params: {
          pageNumber: currentPage,
          pageSize: 6,
          userName,
          branchName,
          userNumber,
          branchNumber,
          eventType,
          toTime,
          fromTime,
        },
      });
      if (close) {
        handleClose();
        // handleCloseEdit();
      }
    },
    [
      fetchEventListCallback,
      currentPage,
      userName,
      branchName,
      userNumber,
      branchNumber,
      eventType,
      toTime,
      fromTime,
    ]
  );

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const rows = React.useMemo(() => {
    return eventsList.map((event) =>
      createData({
        id: event.id,
        idd: event.id,
        branchCode: event.branchCode,
        inputNumber: event.inputNumber,
        userNumber: event.userNumber,
        branchName: event.branchName ? event.branchName : "-",
        eventType: event.eventType
          ? event.eventType === "type1"
            ? "نوع 1"
            : event.eventType === "type2"
            ? "نوع 2"
            : event.eventType === "type3"
            ? "نوع 3"
            : "--"
          : "-",
        userName: event.userName ? event.userName : "-",
        date: new Date(event.date).getTime(),
      })
    );
  }, [eventsList]);

  const handleSubmitFilters = (values: {
    userName?: string;
    userNumber?: number;
    eventType?: "type1" | "type2" | "type3";
    branchName?: string;
    branchNumber?: number;
    fromTime?: string;
    toTime?: string;
  }) => {
    const {
      branchName: branchNameValue,
      branchNumber: branchNumberValue,
      eventType: eventTypeValue,
      userName: userNameValue,
      userNumber: userNumberValue,
      toTime: toTimeValue,
      fromTime: fromTimeValue,
    } = values;
    setBranchName(branchNameValue);
    setBranchNumber(branchNumberValue);
    setEventType(eventTypeValue);
    setUserName(userNameValue);
    setUserNumber(userNumberValue);
    setToTime(toTimeValue);
    setFromTime(fromTimeValue);
    fetch(true);
  };

  const { Modal, handleOpen, handleClose } = useModal({
    children: (
      <EventFiltersModal
        fetch={handleSubmitFilters}
        initValues={{
          branchName,
          branchNumber,
          eventType,
          userName,
          userNumber,
        }}
      />
    ),
    title: "فیلتر ها",
  });

  return (
    <div className="min-w-[70vw]">
      {Modal}
      {/* {ModalDesc} */}
      {/* {ModalSystemAsset} */}
      <EnhancedTable
        headerButtons={[
          {
            icon: <FilterAltIcon />,
            onClick: handleOpen,
            title: "فیلتر ها",
          },
        ]}
        loading={loading}
        filterInputs={[]}
        headCells={[
          ...[
            { id: "idd", label: "شناسه" },
            { id: "date", label: "تاریخ" },
            { id: "branchName", label: "نام شعبه" },
            { id: "branchCode", label: "کد شعبه" },
            { id: "eventType", label: "نوع رویداد" },
            { id: "inputNumber", label: "شماره ورودی" },
            { id: "userNumber", label: "شماره کاربر" },
            { id: "userName", label: "نام کاربر" },
          ].map((key) => ({
            id: key.id,
            disablePadding: false,
            label: key.label,
            numeric: false,
          })),
        ]}
        rows={rows}
        title={"رویدادها"}
        pagination={{
          count: totalPage,
          page: currentPage + 1,
          onPageChange: (_e, value) => setCurrentPage(value - 1),
        }}
      />
    </div>
  );
}
