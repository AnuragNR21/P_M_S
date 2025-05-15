import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, useMediaQuery,
  IconButton, TextField, InputAdornment
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Download, Visibility, Search } from '@mui/icons-material';
import axios from 'axios';
import MainAppBar from './MainAppBar';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MOCK_PAYROLL_DATA = [
  {
    employeeId: 'E001',
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    salary: 7500,
    doj: '2022-03-15',
    month: 'April 2025',
    slip: 'alice_april_2025.pdf',
  },
  {
    employeeId: 'E001',
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    salary: 7500,
    doj: '2022-03-15',
    month: 'March 2025',
    slip: 'alice_march_2025.pdf',
  },
  {
    employeeId: 'E002',
    name: 'Bob Singh',
    role: 'Backend Developer',
    salary: 8200,
    doj: '2021-06-10',
    month: 'April 2025',
    slip: 'bob_april_2025.pdf',
  },
  {
    employeeId: 'E003',
    name: 'Carol Danvers',
    role: 'DevOps Engineer',
    salary: 9000,
    doj: '2023-01-20',
    month: 'April 2025',
    slip: 'carol_april_2025.pdf',
  },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: 'linear-gradient(135deg, rgb(254, 248, 206), rgb(249, 143, 61))',
  minHeight: '100vh',
  boxSizing: 'border-box',
  overflowY: 'auto',
}));

const PayrollCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff3e0',
  borderRadius: 16,
  textAlign: 'center',
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
}));

export default function Payroll() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [payrollData, setPayrollData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchPayrolls = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/payroll`);
      setPayrollData(res.data);
    } catch (err) {
      console.error('Failed to fetch payroll data. Using mock data.', err.message || err);
      setPayrollData(MOCK_PAYROLL_DATA);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSelectedEmployee(null);
      return;
    }

    const grouped = payrollData.reduce((acc, entry) => {
      const key = `${entry.employeeId}_${entry.name}`.toLowerCase();
      if (key.includes(term)) {
        if (!acc[entry.employeeId]) acc[entry.employeeId] = [];
        acc[entry.employeeId].push(entry);
      }
      return acc;
    }, {});

    const firstMatchKey = Object.keys(grouped)[0];
    if (firstMatchKey) {
      setSelectedEmployee({
        employeeId: firstMatchKey,
        records: grouped[firstMatchKey],
      });
    } else {
      setSelectedEmployee(null);
    }
  }, [searchTerm, payrollData]);

  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/payroll/download/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download error, using fallback:', err.message || err);
      const link = document.createElement('a');
      link.href = `/mock_slips/${filename}`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <>
      <MainAppBar />
      <StyledContainer>
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold" gutterBottom>
          Payroll Management
        </Typography>

        <TextField
          label="Search by Employee ID or Name"
          variant="outlined"
          fullWidth
          sx={{ my: 3, backgroundColor: 'white', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {selectedEmployee ? (
          <Box>
            <PayrollCard sx={{ mb: 3 }}>
              <Typography variant="h6">{selectedEmployee.records[0].name}</Typography>
              <Typography variant="subtitle1">
                ID: {selectedEmployee.records[0].employeeId}
              </Typography>
              <Typography variant="subtitle1">
                Role: {selectedEmployee.records[0].role}
              </Typography>
              <Typography variant="subtitle1">
                Salary: ${selectedEmployee.records[0].salary.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">
                Date of Joining: {new Date(selectedEmployee.records[0].doj).toDateString()}
              </Typography>
            </PayrollCard>

            <Typography variant="h6" gutterBottom>Salary Slips</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f79635' }}>
                  <TableRow>
                    <TableCell><b>Month</b></TableCell>
                    <TableCell align="center"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEmployee.records.map((record, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{record.month}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => window.open(`${API_BASE_URL}/uploads/${record.slip}`, '_blank')}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleDownload(record.slip)}>
                          <Download />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography variant="subtitle1" mt={2}>
            Enter an employee name or ID to view details.
          </Typography>
        )}
      </StyledContainer>
    </>
  );
}
