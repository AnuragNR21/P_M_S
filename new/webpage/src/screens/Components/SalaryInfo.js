import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    IconButton,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SalaryInfo = () => {
    const [form, setForm] = useState({
        empId: 'INDTEST',
        basic: '',
        da: '',
        hra: '',
        professionalDevelopment: '',
        conveyanceAllowance: '',
        foodAllowance: '',
        otherAllowance: '',
        ctc: '',
        monthly: false
    });

    const [monthlyData, setMonthlyData] = useState({});
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleCheckbox = (e) => {
        setForm({ ...form, monthly: e.target.checked });
    };

    const handleUpdateMonthly = () => {
        const factor = 0.0833333;
        const updated = Object.fromEntries(
            Object.entries(form)
                .filter(([k]) => k !== 'monthly' && k !== 'empId')
                .map(([k, v]) => [k, Math.round(+v * factor)])
        );
        setMonthlyData(updated);
    };

    return (
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFE0B2, #FFB74D)',
                overflowX: 'hidden',      // prevent horizontal scroll
                maxWidth: '100vw',         // prevent right side overflow
                boxSizing: 'border-box'
            }}
        >
            <Box display="flex" alignItems="center" mb={3} flexWrap="wrap">
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'black', mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                    Employee Salary Info
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: '#fff3e0' }}>
                        <TextField select fullWidth label="Emp ID" value={form.empId} onChange={handleChange('empId')} margin="normal">
                            <MenuItem value="INDTEST">INDTEST</MenuItem>
                        </TextField>
                        <TextField fullWidth label="Basic" value={form.basic} onChange={handleChange('basic')} margin="normal" />
                        <TextField fullWidth label="DA" value={form.da} onChange={handleChange('da')} margin="normal" />
                        <TextField fullWidth label="HRA" value={form.hra} onChange={handleChange('hra')} margin="normal" />
                        <TextField fullWidth label="CTC" value={form.ctc} onChange={handleChange('ctc')} margin="normal" />
                        <TextField fullWidth label="Professional Development" value={form.professionalDevelopment} onChange={handleChange('professionalDevelopment')} margin="normal" />
                        <TextField fullWidth label="Conveyance Allowance" value={form.conveyanceAllowance} onChange={handleChange('conveyanceAllowance')} margin="normal" />
                        <TextField fullWidth label="Food Allowance" value={form.foodAllowance} onChange={handleChange('foodAllowance')} margin="normal" />
                        <TextField fullWidth label="Other Allowance" value={form.otherAllowance} onChange={handleChange('otherAllowance')} margin="normal" />
                        <Grid item xs={12} textAlign="center" mt={2}>
                            <Button variant="contained" sx={{ backgroundColor: '#fb8c00', mx: 1 }} onClick={() => alert('Add clicked')}>Add</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#f57c00', mx: 1 }} onClick={() => alert('Update clicked')}>Update</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#e65100', mx: 1 }} onClick={() => alert('Delete clicked')}>Delete</Button>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={4} sx={{ p: 3, mt: 4, backgroundColor: '#ffe0b2', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#5d4037' }}>
                            Monthly Salary Breakdown
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField label="Basic" fullWidth value={monthlyData.basic || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="DA" fullWidth value={monthlyData.da || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="HRA" fullWidth value={monthlyData.hra || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="CTC" fullWidth value={monthlyData.ctc || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="Professional Development" fullWidth value={monthlyData.professionalDevelopment || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="Conveyance Allowance" fullWidth value={monthlyData.conveyanceAllowance || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="Food Allowance" fullWidth value={monthlyData.foodAllowance || ''} InputProps={{ readOnly: true }} margin="dense" />
                                <TextField label="Other Allowance" fullWidth value={monthlyData.otherAllowance || ''} InputProps={{ readOnly: true }} margin="dense" />
                            </Grid>
                        </Grid>
                        <Box textAlign="center" mt={2}>
                            <Button variant="contained" sx={{ backgroundColor: '#fb8c00' }} onClick={handleUpdateMonthly}>Update</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalaryInfo;
