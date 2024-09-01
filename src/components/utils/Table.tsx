import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { maskId } from "@/utils/InfoMast";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import useDateUtils from "@/utils/Date";

type Data = {
  [key: string]: string | React.ReactNode | number;
  id: number | string;
};

// eslint-disable-next-line react-refresh/only-export-components
export function createData(data: Data): Data {
  return {
    ...data,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | React.ReactNode | boolean },
  b: { [key in Key]: number | string | React.ReactNode | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  sortValue?: number | string;
}

interface EnhancedTableHeadProps {
  checkBox?: {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  headCells: HeadCell[];
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { checkBox, order, orderBy, headCells } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      if (checkBox) checkBox.onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* {checkBox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={
                checkBox.numSelected > 0 && checkBox.numSelected < rowCount
              }
              checked={rowCount > 0 && checkBox.numSelected === rowCount}
              onChange={checkBox.onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )} */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            className="text-nowrap"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id as string)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  optionOnSelected?: {
    icon: React.ReactNode;
    onClick: () => void | Promise<void>;
    title: string;
  }[];
  headerButtons?: {
    icon: React.ReactNode;
    onClick: () => void | Promise<void>;
    title: string;
  }[];
  filterInputs?: React.ReactNode[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title, optionOnSelected, headerButtons, filterInputs } =
    props;

  return (
    <Toolbar
      className="!flex !w-full !items-start !py-5 "
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          color="inherit"
          variant="subtitle1"
          component="div"
          className="text-nowrap w-fit !mx-4"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          className="text-nowrap w-fit !mx-4"
        >
          {title}
        </Typography>
      )}
      <div className="flex flex-wrap grow w-full items-start gap-y-3 justify-end">
        {filterInputs ? filterInputs.map((filter) => filter) : null}
      </div>

      {numSelected > 0 ? (
        <>
          {optionOnSelected
            ? optionOnSelected.map((option) => (
                <Tooltip title={option.title}>
                  <IconButton onClick={option.onClick}>
                    {option.icon}
                  </IconButton>
                </Tooltip>
              ))
            : null}
        </>
      ) : (
        <>
          {headerButtons
            ? headerButtons.map((option) => (
                <Tooltip title={option.title} key={option.title}>
                  <IconButton onClick={option.onClick}>
                    {option.icon}
                  </IconButton>
                </Tooltip>
              ))
            : null}
        </>
      )}
    </Toolbar>
  );
}

interface EnhancedTableProps {
  loading: boolean;
  rows: Data[];
  title: string;
  optionOnSelected?: {
    icon: React.ReactNode;
    onClick: () => void | Promise<void>;
    title: string;
  }[];
  headerButtons?: {
    icon: React.ReactNode;
    onClick: () => void | Promise<void>;
    title: string;
  }[];
  checkBox?: {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelected: (value: (number | string)[]) => void;
  };
  headCells: HeadCell[];
  pagination?: {
    count: number;
    page: number;
    onPageChange: (e: any, value: number) => void;
  };
  filterInputs?: React.ReactNode[];
}

export default function EnhancedTable(props: EnhancedTableProps) {
  const {
    rows,
    title,
    checkBox,
    headCells,
    headerButtons,
    optionOnSelected,
    pagination,
    loading,
    filterInputs,
  } = props;

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<(number | string)[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: number | string
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: (number | string)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (checkBox) {
      checkBox.setSelected(newSelected);
    }
    setSelected(newSelected);
  };

  React.useEffect(() => {
    if (checkBox && checkBox?.numSelected && checkBox?.numSelected === 0) {
      checkBox.setSelected([]);
      setSelected([]);
    }
  }, [checkBox]);

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  const { formatDateWithTime } = useDateUtils();

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          optionOnSelected={
            optionOnSelected
              ? optionOnSelected.map((option) => ({
                  ...option,
                  onClick: () => {
                    option.onClick();
                    checkBox.setSelected([]);
                    setSelected([]);
                  },
                }))
              : undefined
          }
          headerButtons={headerButtons}
          title={title}
          numSelected={selected.length}
          filterInputs={filterInputs}
        />
        <TableContainer>
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress sx={{ m: 1 }} color="primary" />
              <Typography
                sx={{
                  display: "inline-block",
                  color: "primary.main",
                  p: 1,
                }}
              >
                Data is loading...
              </Typography>
            </Stack>
          ) : visibleRows.length ? (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                rowCount={rows.length}
                checkBox={{
                  numSelected: selected.length,
                  onRequestSort: (e, p) => {
                    handleRequestSort(e, p);
                  },
                  onSelectAllClick: (e) => {
                    handleSelectAllClick(e);
                  },
                }}
                headCells={headCells}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id as number);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id as number}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {checkBox ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleClick(event, row.id as number)
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      ) : null}

                      {headCells.map((head) =>
                        head.id === "id" ? (
                          <TableCell key={head.id}>
                            <Tooltip
                              title={row[head.id]}
                              children={
                                maskId(
                                  row[head.id] as string
                                ) as unknown as React.ReactElement
                              }
                            />
                          </TableCell>
                        ) : head.id === "date" ? (
                          <TableCell key={head.id} className="text-nowrap">
                            {formatDateWithTime(new Date(row[head.id] as any))}
                          </TableCell>
                        ) : (
                          <TableCell key={head.id} className="text-nowrap">
                            {row[head.id]}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Typography className="mx-auto text-center w-full" variant="h5">
              No Data{" "}
            </Typography>
          )}
        </TableContainer>
        {pagination ? (
          <Pagination
            className="py-5 mx-auto flex items-center justify-center"
            count={pagination.count}
            page={pagination.page}
            onChange={pagination.onPageChange}
          />
        ) : null}
      </Paper>
    </Box>
  );
}
