import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  { id: 'population', label: 'Population', minWidth: 170, align: 'right', format: val => val.toLocaleString('en-US') },
  { id: 'size', label: 'Size\u00a0(km\u00b2)', minWidth: 170, align: 'right', format: val => val.toLocaleString('en-US') },
  { id: 'density', label: 'Density', minWidth: 170, align: 'right', format: val => val.toFixed(2) },
];

const mockData = [
  { name: 'India', code: 'IN', population: 1324171354, size: 3287263 },
  { name: 'China', code: 'CN', population: 1403500365, size: 9596961 },
  { name: 'Italy', code: 'IT', population: 60483973, size: 301340 },
  { name: 'United States', code: 'US', population: 327167434, size: 9833520 },
  { name: 'Canada', code: 'CA', population: 37602103, size: 9984670 },
  { name: 'Australia', code: 'AU', population: 25475400, size: 7692024 },
  { name: 'Germany', code: 'DE', population: 83019200, size: 357578 },
  { name: 'Ireland', code: 'IE', population: 4857000, size: 70273 },
  { name: 'Mexico', code: 'MX', population: 126577691, size: 1972550 },
  { name: 'Japan', code: 'JP', population: 126317000, size: 377973 },
  { name: 'France', code: 'FR', population: 67022000, size: 640679 },
  { name: 'United Kingdom', code: 'GB', population: 67545757, size: 242495 },
  { name: 'Russia', code: 'RU', population: 146793744, size: 17098246 },
  { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768 },
  { name: 'Brazil', code: 'BR', population: 210147125, size: 8515767 },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadData = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(mockData.map(item => ({
            ...item,
            density: item.population / item.size,
          })));
        }, 1000);
      });

    loadData().then(setRows);
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2} sx={{ backgroundColor: 'rgb(248, 185, 133)' }}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3} sx={{ backgroundColor: 'rgb(248, 185, 133)' }}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                  sx={{ backgroundColor: 'rgb(248, 185, 133)' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
