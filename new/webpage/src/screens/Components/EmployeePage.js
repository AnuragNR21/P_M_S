import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainAppBar from './MainAppBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff3e0',
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3)
}));

export default function EmployeePage() {
  const [formData, setFormData] = useState({
    empId: '',
    empName: '',
    designation: '',
    doj: '',
    location: '',
    pan: '',
    uan: '',
    bankAccount: '',
    aadhar: '',
    dob: '',
    email: '',
    primarycontact: '',
    maritalstatus: 'No',
    spousesname: '',
    emergencycontactname: '',
    permanentaddress: '',
    presentaddress: '',
    ifsccode: ''
  });

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setEmployees([...employees, formData]);
    setFormData({
      empId: '',
      empName: '',
      designation: '',
      doj: '',
      location: '',
      pan: '',
      uan: '',
      bankAccount: '',
      aadhar: '',
      dob: '',
      email: '',
      primarycontact: '',
      maritalstatus: 'No',
      spousesname: '',
      emergencycontactname: '',
      permanentaddress: '',
      presentaddress: '',
      ifsccode: ''
    });
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  const handleUpdate = (index) => {
    const selectedEmployee = employees[index];
    setFormData(selectedEmployee);
    handleDelete(index);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <MainAppBar />
      <Paper sx={{ mt: 10, px: 4, py: 3, pt: 10, boxSizing: 'border-box', margin: '12px' }}>
        <Typography variant="h5" gutterBottom>
          Employee Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Employee ID" name="empId" value={formData.empId} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Name" name="empName" value={formData.empName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth type="date" label="DOB" name="dob" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Primary Contact" name="primarycontact" value={formData.primarycontact} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Marital Status</InputLabel>
              <Select name="maritalstatus" value={formData.maritalstatus} label="Marital Status" onChange={handleChange}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Spouse Name" name="spousesname" value={formData.spousesname} onChange={handleChange} disabled={formData.maritalstatus === "No"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Emergency Contact" name="emergencycontactname" value={formData.emergencycontactname} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Permanent Address" name="permanentaddress" value={formData.permanentaddress} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Present Address" name="presentaddress" value={formData.presentaddress} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Aadhar" name="aadhar" value={formData.aadhar} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="PAN" name="pan" value={formData.pan} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="UAN" name="uan" value={formData.uan} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Bank A/c No." name="bankAccount" value={formData.bankAccount} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="IFSC Code" name="ifsccode" value={formData.ifsccode} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} />
          </Grid>
         <Grid item xs={12} md={4}>
              <TextField fullWidth type="date" label="Joining Date" name="doj" value={formData.doj} onChange={handleChange} InputLabelProps={{ shrink: true }} />

            </Grid>

          
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
              Add
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'rgb(248, 185, 133)' }}>
              <TableRow>
                <TableCell>EmpID</TableCell>
                <TableCell>EmpName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>DOJ</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>BankAccount</TableCell>
                <TableCell>PAN</TableCell>
                <TableCell>UAN</TableCell>
                <TableCell>IFSC</TableCell>
                <TableCell>Marital Status</TableCell>
                <TableCell>Spouse Name</TableCell>
                <TableCell>Emergency Contact</TableCell>
                <TableCell>Permanent Address</TableCell>
                <TableCell>Present Address</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: 'rgb(245, 216, 193)' }}>
              {employees.map((emp, index) => (
                <TableRow key={index}>
                  <TableCell>{emp.empId}</TableCell>
                  <TableCell>{emp.empName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.dob}</TableCell>
                  <TableCell>{emp.primarycontact}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.doj}</TableCell>
                  <TableCell>{emp.location}</TableCell>
                  <TableCell>{emp.bankAccount}</TableCell>
                  <TableCell>{emp.pan}</TableCell>
                  <TableCell>{emp.uan}</TableCell>
                  <TableCell>{emp.ifsccode}</TableCell>
                  <TableCell>{emp.maritalstatus}</TableCell>
                  <TableCell>{emp.spousesname}</TableCell>
                  <TableCell>{emp.emergencycontactname}</TableCell>
                  <TableCell>{emp.permanentaddress}</TableCell>
                  <TableCell>{emp.presentaddress}</TableCell>
                  <TableCell align="center">
                    <Button color="primary" onClick={() => handleUpdate(index)}>
                      Update
                    </Button>
                    <Button color="error" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/processsalarypage')} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
            Process Salary
          </Button>
        </Grid>

        <Grid sx={{mt:2}}>
          <Button variant="contained" onClick={() => navigate('/salaryinfo')} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
            Employee Salary Info
          </Button>
        </Grid>
      </Paper>
      <Footer />
    </Box>
  );
}