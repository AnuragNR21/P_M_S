import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RestartAlt as ResetIcon,
  UploadFile as UploadFileIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import axios from "axios";
import MainAppBar from "./MainAppBar";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: "linear-gradient(135deg, rgb(254, 248, 206), rgb(249, 143, 61))",
  minHeight: "100vh",
  overflowY: "auto",
  paddingTop: "80px"
}));

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff3e0",
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3)
}));

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    dob: "",
    primaryContact: "",
    maritalStatus: "No",
    spouseName: "",
    emergencyContact: "",
    permanentAddress: "",
    presentAddress: "",
    aadhaarCard: "",
    panCard: "",
    bankAccount: "",
    ifscCode: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [salaryInfoOpen, setSalaryInfoOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  const addOrUpdateEmployee = () => {
    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = newEmployee;
      setEmployees(updated);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setNewEmployee({
      name: "",
      dob: "",
      primaryContact: "",
      maritalStatus: "No",
      spouseName: "",
      emergencyContact: "",
      permanentAddress: "",
      presentAddress: "",
      aadhaarCard: "",
      panCard: "",
      bankAccount: "",
      ifscCode: ""
    });
  };

  const editEmployee = (index) => {
    setNewEmployee(employees[index]);
    setEditingIndex(index);
  };

  const deleteEmployee = (index) => {
    const updated = [...employees];
    updated.splice(index, 1);
    setEmployees(updated);
  };

  const resetPassword = (emp) => {
    alert(`Password reset email sent to ${emp.email || emp.primaryContact}@example.com (mock).`);
  };

  const handleCsvUpload = () => {
    alert("CSV upload feature coming soon. (Mock)");
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <MainAppBar />
      <StyledContainer>
        <Card>
          <Typography variant="h6" mb={2}>
            {editingIndex !== null ? "Edit Employee" : "Add New Employee"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Name" name="name" value={newEmployee.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth type="date" label="DOB" name="dob" value={newEmployee.dob} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Primary Contact" name="primaryContact" value={newEmployee.primaryContact} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select name="maritalStatus" value={newEmployee.maritalStatus} label="Marital Status" onChange={handleInputChange}>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Spouse Name" name="spouseName" value={newEmployee.spouseName} onChange={handleInputChange} disabled={newEmployee.maritalStatus === "No"} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={newEmployee.emergencyContact} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Permanent Address" name="permanentAddress" value={newEmployee.permanentAddress} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Present Address" name="presentAddress" value={newEmployee.presentAddress} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Aadhaar Card" name="aadhaarCard" value={newEmployee.aadhaarCard} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="PAN Card" name="panCard" value={newEmployee.panCard} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Bank Account No." name="bankAccount" value={newEmployee.bankAccount} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="IFSC Code" name="ifscCode" value={newEmployee.ifscCode} onChange={handleInputChange} />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" onClick={addOrUpdateEmployee} startIcon={<AddIcon />} sx={{ backgroundColor: "#f79635" }}>
              {editingIndex !== null ? "Update" : "Add"} Employee
            </Button>
            <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={handleCsvUpload}>
              Import CSV
            </Button>
            <Tooltip title="How salary is calculated">
              <IconButton onClick={() => setSalaryInfoOpen(true)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Card>

        <Card>
          <Typography variant="h6" mb={2}>Employee List</Typography>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f79635" }}>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>DOB</b></TableCell>
                  <TableCell><b>Primary Contact</b></TableCell>
                  <TableCell><b>Marital Status</b></TableCell>
                  <TableCell><b>Spouse</b></TableCell>
                  <TableCell><b>Emergency Contact</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((emp, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.dob}</TableCell>
                    <TableCell>{emp.primaryContact}</TableCell>
                    <TableCell>{emp.maritalStatus}</TableCell>
                    <TableCell>{emp.spouseName}</TableCell>
                    <TableCell>{emp.emergencyContact}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => editEmployee(idx)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteEmployee(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reset Password">
                        <IconButton onClick={() => resetPassword(emp)}>
                          <ResetIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Payslip">
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download Payslip">
                        <IconButton>
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={salaryInfoOpen} onClose={() => setSalaryInfoOpen(false)}>
          <DialogTitle>Salary Calculation</DialogTitle>
          <DialogContent>
            <Typography>
              Salary is calculated based on:
              <ul>
                <li>Base Pay</li>
                <li>Attendance</li>
                <li>Bonuses</li>
                <li>Deductions: PF, Tax, Loans</li>
              </ul>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSalaryInfoOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </StyledContainer>
    </>
  );
}
