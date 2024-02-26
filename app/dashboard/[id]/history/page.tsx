
'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {  getUser } from '@/lib/getUser';

interface Date{
  meta: {
      date: {
        _seconds: number;
        _nanoseconds: number;
      };
    };
}
interface Transaction {
  amount: number;
  balanceBefore: number;
  date: Date;
  meta: {
      date: {
        _seconds: number;
        _nanoseconds: number;
      };
    };
  newBalance: number;
  description: string;
}

interface UserData {
  wallets: {
    transactions: Transaction[];
  }[];
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [filterActive, setFilterActive] = React.useState(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Transaction>('date');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('isSubAccount');
        if (!id) {
          console.error('isSubAccount ID not found in localStorage');
          return;
        }
        const userData: UserData = await getUser(id);
        const userTransactions: Transaction[] = userData.wallets.flatMap(wallet => wallet.transactions);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (property: keyof Transaction) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleFilterClick = () => {
    setFilterActive(!filterActive);
  };

  return (
    
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography
            sx={{ flex: '1 1 100%' }}
            id="tableTitle"
            component="div"
          >
            <h6 className=' font-raleway text-base font-bold'>
                Transactions
            </h6>
          </Typography>
          <Tooltip title="Filter list">
            <IconButton onClick={handleFilterClick}>
              <FilterListIcon color={filterActive ? 'primary' : 'inherit'} />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody sx={{
              fontFamily:'raleway'
            }}>
              {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{new Date(transaction.meta.date._seconds * 1000).toLocaleString()}</TableCell>
                      <TableCell>{transaction.amount > 0 ? 'Received' : 'Sent'}</TableCell>
                      <TableCell>USD {Math.abs(transaction.amount)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  onRequestSort: (property: keyof Transaction) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Transaction) => () => {
      onRequestSort(property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell sortDirection={orderBy === 'date' ? order : false}>
          <TableSortLabel
            active={orderBy === 'date'}
            direction={orderBy === 'date' ? order : 'asc'}
            onClick={createSortHandler('date')}
          >
            Date
            {orderBy === 'date' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]).slice(0) as T[];
}


