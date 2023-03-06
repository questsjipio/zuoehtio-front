import * as React from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import SearchOutputType from "../types/SearchPage/SearchOutputType"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { checkArrayHasElement, checkStringHasValue, convertStringIntoHtmlList, convertToBoolean } from '../utils/GeneralHelpers'
import { LINK_FRONTEND_GET_PROJ } from "../api/ApiCallProperties"
import "../style/search.css"

interface Data {
    requestorName: string,
    companyName: string,
    services: string,
    canWorkWithDiffAbled: string,
    diffAbledExp: string,
    description: string
}

function createData(
    requestorName: string,
    companyName: string,
    services: string,
    canWorkWithDiffAbled: string,
    diffAbledExp: string,
    description: string
): Data {
    return {
        requestorName,
        companyName,
        services,
        canWorkWithDiffAbled,
        diffAbledExp,
        description
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

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
}

const headCells: readonly HeadCell[] = [
  {
    id: 'requestorName',
    numeric: false,
    disablePadding: false,
    label: "Requestor Name",
  },
  {
    id: 'companyName',
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: 'services',
    numeric: false,
    disablePadding: false,
    label: "Services",
  },
  {
    id: 'canWorkWithDiffAbled',
    numeric: false,
    disablePadding: false,
    label: "Accepts Our Workers",
  },
  {
    id: 'diffAbledExp',
    numeric: false,
    disablePadding: false,
    label: 'Experiences',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell
          key={'actions'}
          align={"left"}
          padding={'normal'}
        >
          <b>Actions</b>
        </TableCell>
        <TableCell/>
      </TableRow>
    </TableHead>
  );
}

export default function SearchTable(props: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('requestorName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const dense = false
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [opens, setOpens] = React.useState([false]);
  const rows: SearchOutputType[] = props.apiResponseData;

  React.useEffect(() => {
    setPage(0)
  }, [rows])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.requestorName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setOpens([false])
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setOpens([false]);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-label="collapsible table"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            { 
              checkArrayHasElement(rows) ? 
              <>
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <>
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.requestorName}
                          >
                            <TableCell
                              align="left"
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="normal"
                            >
                              {row.requestorName}
                            </TableCell>
                            <TableCell align="left">{checkStringHasValue(row.companyName) ? row.companyName : "-" }</TableCell>
                            <TableCell align="left">{convertStringIntoHtmlList(row.services, ",")}</TableCell>
                            <TableCell align="left">{convertToBoolean(row.canWorkWithDiffAbled) ? <CheckIcon color='success'/> : "-" }</TableCell>
                            <TableCell align="left">{convertStringIntoHtmlList(row.diffAbledExp, ",")}</TableCell>
                            <TableCell align="left">
                              <div><Link to={LINK_FRONTEND_GET_PROJ + row.projectId}>View</Link></div>
                            </TableCell>
                            <TableCell align="left">
                              <div onClick={() => {
                                let newOpens = Array.from(opens)
                                newOpens[index] = !newOpens[index]
                                setOpens(newOpens)
                              }
                              }>{ opens[index] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }</div>
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                              <Collapse in={opens[index]} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1, marginLeft: 0 }}>
                                  { checkStringHasValue(row.description) ? row.description : "-" }
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </>
              :
              <>
                <TableCell colSpan={6}>
                  <div className="searchNoResult">{ props.clickedSearch ? "No Result" : "Click search to retrieve result" }</div>
                </TableCell>
              </>
            }
          </Table>
        </TableContainer>
        {
          checkArrayHasElement(rows) ?
          <>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
          : null
        }
      </Paper>
    </Box>
  );
}