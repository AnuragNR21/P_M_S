import React, { useState } from 'react';
import {
    Box, Button, Grid, TextField, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import MainAppBar from './MainAppBar';
import Footer from './Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ProcessSalaryPage() {
    const [form, setForm] = useState({
        empemailId: '', salaryMonth: '', workedDays: '', lopDays: '', basic: '', bonus: '',
        pf: '', professionalTax: '', tds: ''
    });

    const [processedSalaries, setProcessedSalaries] = useState([]);
    const [search, setSearch] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [viewData, setViewData] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleProcessSalary = () => {
        if (editingIndex !== null) {
            const updated = [...processedSalaries];
            updated[editingIndex] = { ...form, timestamp: updated[editingIndex].timestamp };
            setProcessedSalaries(updated);
            setEditingIndex(null);
        } else {
            const timestamp = new Date().toLocaleString();
            setProcessedSalaries([...processedSalaries, { ...form, timestamp }]);
        }

        setForm({
            empemailId: '', salaryMonth: '', workedDays: '', lopDays: '', basic: '', bonus: '',
            pf: '', professionalTax: '', tds: ''
        });
    };

    const handleEdit = (index) => {
        setForm(processedSalaries[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updated = [...processedSalaries];
        updated.splice(index, 1);
        setProcessedSalaries(updated);
    };

    const handleView = (data) => {
        setViewData(data);
    };

    const calculateNetPay = (data) => {
        const earnings = parseFloat(data.basic || 0) + parseFloat(data.bonus || 0);
        const deductions = parseFloat(data.pf || 0) + parseFloat(data.professionalTax || 0) + parseFloat(data.tds || 0);
        return (earnings - deductions).toFixed(2);
    };

    const handleDownload = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Payslip", 90, 10);
        doc.text(`Month: ${data.salaryMonth}`, 14, 20);
        doc.text(`Employee Email ID: ${data.empemailId}`, 14, 30);
        doc.text(`Worked Days: ${data.workedDays}`, 14, 40);
        doc.text(`LOP Days: ${data.lopDays}`, 14, 50);
        doc.text(`Basic: ₹${data.basic}`, 14, 60);
        doc.text(`Bonus: ₹${data.bonus}`, 14, 70);
        doc.text(`PF: ₹${data.pf}`, 14, 80);
        doc.text(`Professional Tax: ₹${data.professionalTax}`, 14, 90);
        doc.text(`TDS: ₹${data.tds}`, 14, 100);
        doc.text(`Net Pay: ₹${calculateNetPay(data)}`, 14, 110);
        doc.text(`Generated on: ${data.timestamp}`, 14, 120);
        doc.save(`${data.empemailId}_Payslip_${data.salaryMonth}.pdf`);
    };

    const exportToCSV = () => {
        const csv = [
            ["Emp Email ID", "Month", "Worked Days", "LOP", "Basic", "Bonus", "PF", "Tax", "TDS", "Timestamp"],
            ...processedSalaries.map(row => [
                row.empemailId, row.salaryMonth, row.workedDays, row.lopDays,
                row.basic, row.bonus, row.pf, row.professionalTax, row.tds, row.timestamp
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Processed_Salaries.csv';
        link.click();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Processed Salary Report", 14, 16);
        doc.autoTable({
            head: [["Emp Email ID", "Month", "Worked", "LOP", "Basic", "Bonus", "PF", "Tax", "TDS", "Timestamp"]],
            body: processedSalaries.map(row => [
                row.empemailId, row.salaryMonth, row.workedDays, row.lopDays,
                row.basic, row.bonus, row.pf, row.professionalTax, row.tds, row.timestamp
            ]),
            startY: 22
        });
        doc.save("Processed_Salaries.pdf");
    };

    const filteredSalaries = processedSalaries.filter((s) =>
        s.empemailId.toLowerCase().includes(search.toLowerCase().trim()) ||
        s.salaryMonth.toLowerCase().includes(search.toLowerCase().trim())
    );

    return (
        <>
            <MainAppBar />
            <Box p={3} sx={{ backgroundColor: "#fff3e0", minHeight: "100vh", paddingTop: "100px" }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <IconButton onClick={() => navigate(-1)} sx={{ color: 'black', mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                        Process Salary
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {['empemailId', 'salaryMonth', 'workedDays', 'lopDays', 'basic', 'bonus', 'pf', 'professionalTax', 'tds'].map((field, i) => (
                        <Grid item xs={12} sm={field === 'salaryMonth' ? 3 : 2} key={i}>
                            <TextField
                                label={
                                    field === 'salaryMonth' ? 'Month of Salary' :
                                    field === 'empemailId' ? 'Emp Email ID' :
                                    field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                                }
                                name={field}
                                type={field === 'salaryMonth' ? 'date' : 'text'}
                                InputLabelProps={field === 'salaryMonth' ? { shrink: true } : {}}
                                fullWidth
                                value={form[field]}
                                onChange={handleChange}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={2}>
                        <Button variant="contained" fullWidth onClick={handleProcessSalary} sx={{
                            height: '100%',
                            backgroundColor: '#FF9800',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
                            '&:hover': { backgroundColor: '#FB8C00' }
                        }}>
                            {editingIndex !== null ? 'Update' : 'Process'}
                        </Button>
                    </Grid>
                </Grid>

                <Box mt={4} display="flex" gap={2}>
                    <Button onClick={exportToCSV} variant="outlined" color="primary">Export to CSV</Button>
                    <Button onClick={exportToPDF} variant="outlined" color="secondary">Export to PDF</Button>
                </Box>

                <Box mt={4}>
                    <TextField
                        label="Search by Emp ID or Date"
                        placeholder="E.g., EMP123 or 2025-05"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
                    />

                    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#FFEBCC' }}>
                                <TableRow>
                                    <TableCell><b>Emp Email ID</b></TableCell>
                                    <TableCell><b>Month</b></TableCell>
                                    <TableCell><b>Worked</b></TableCell>
                                    <TableCell><b>LOP</b></TableCell>
                                    <TableCell><b>Basic</b></TableCell>
                                    <TableCell><b>Bonus</b></TableCell>
                                    <TableCell><b>PF</b></TableCell>
                                    <TableCell><b>Tax</b></TableCell>
                                    <TableCell><b>TDS</b></TableCell>
                                    <TableCell><b>Timestamp</b></TableCell>
                                    <TableCell><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSalaries.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.empemailId}</TableCell>
                                        <TableCell>{row.salaryMonth}</TableCell>
                                        <TableCell>{row.workedDays}</TableCell>
                                        <TableCell>{row.lopDays}</TableCell>
                                        <TableCell>{row.basic}</TableCell>
                                        <TableCell>{row.bonus}</TableCell>
                                        <TableCell>{row.pf}</TableCell>
                                        <TableCell>{row.professionalTax}</TableCell>
                                        <TableCell>{row.tds}</TableCell>
                                        <TableCell>{row.timestamp}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(index)} color="primary"><EditIcon /></IconButton>
                                            <IconButton onClick={() => handleDelete(index)} color="error"><DeleteIcon /></IconButton>
                                            <IconButton onClick={() => handleView(row)}><VisibilityIcon /></IconButton>
                                            <IconButton onClick={() => handleDownload(row)}><DownloadIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            <Dialog open={!!viewData} onClose={() => setViewData(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Payslip - {viewData?.salaryMonth}</DialogTitle>
                <DialogContent>
                    {viewData && (
                        <Box sx={{ fontFamily: 'monospace', lineHeight: 1.7 }}>
                            <Typography><b>Employee Email ID:</b> {viewData.empemailId}</Typography>
                            <Typography><b>Worked Days:</b> {viewData.workedDays}</Typography>
                            <Typography><b>LOP Days:</b> {viewData.lopDays}</Typography>
                            <Typography><b>Basic:</b> ₹{viewData.basic}</Typography>
                            <Typography><b>Bonus:</b> ₹{viewData.bonus}</Typography>
                            <Typography><b>PF:</b> ₹{viewData.pf}</Typography>
                            <Typography><b>Professional Tax:</b> ₹{viewData.professionalTax}</Typography>
                            <Typography><b>TDS:</b> ₹{viewData.tds}</Typography>
                            <Typography><b>Net Pay:</b> ₹{calculateNetPay(viewData)}</Typography>
                            <Typography><b>Generated On:</b> {viewData.timestamp}</Typography>
                            <Typography variant="body2" mt={2}><i>Note: This is a computer-generated payslip.</i></Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewData(null)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}
