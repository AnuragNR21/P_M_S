import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MainAppBar from "./MainAppBar";
import Footer from "./Footer";

const helpTopics = [
  {
    question: "How do I add a new employee?",
    answer: "Go to the 'Employees' section and click on 'Add Employee'. Fill in the required details and submit."
  },
  {
    question: "How is salary calculated?",
    answer: "Salary is based on the base pay, attendance, bonuses, and applicable deductions such as PF, tax, and loans."
  },
  {
    question: "How to generate payslips?",
    answer: "Navigate to 'Payslips', select the month, and click 'Generate'. You can then download each slip as a PDF."
  },
  {
    question: "How can I update employee information?",
    answer: "Go to 'Employees', search for the employee, click 'Edit', make the necessary changes, and save."
  },
  {
    question: "What happens if I delete an employee?",
    answer: "Deleting an employee removes them from the active list, but their past payroll records are retained for auditing."
  },
  {
    question: "Can I track employee attendance?",
    answer: "Yes, the system includes an attendance module where you can view and update daily attendance records."
  },
  {
    question: "How do I set up salary structures?",
    answer: "Go to the 'Settings' > 'Salary Structure' and define components such as basic pay, HRA, allowances, etc."
  },
  {
    question: "How do I view monthly payroll reports?",
    answer: "Click on 'Reports' in the menu, choose the month and department, and generate a payroll summary report."
  },
  {
    question: "Is the system compliant with tax regulations?",
    answer: "Yes, the system is designed to calculate income tax and generate Form 16 for employees as per statutory norms."
  },
  {
    question: "How to reset an employee's password?",
    answer: "Navigate to the employee profile and click 'Reset Password'. The new password will be sent to their email."
  },
  {
    question: "How do I import employee data in bulk?",
    answer: "Go to 'Import', upload a CSV file in the specified format, and map the fields accordingly."
  },
  {
    question: "Can I assign roles and permissions to users?",
    answer: "Yes, go to 'Admin Panel' > 'User Roles' to assign specific access rights to HR, finance, or admin users."
  },
  {
    question: "What if salary is processed with wrong data?",
    answer: "If the salary is processed incorrectly, you can reverse the payroll run for that employee and reprocess it."
  }
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");

  const filteredTopics = helpTopics.filter(topic =>
    topic.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <MainAppBar />
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #FFD3A5,rgb(246, 147, 9))",
        minHeight: "100vh",
        padding: "2rem",
        borderRadius: "20px"
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#fff", fontWeight: 600 }}
      >
        Help Center
      </Typography>

      <TextField
        fullWidth
        label="Search help topics..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2
        }}
      />

      {filteredTopics.length > 0 ? (
        filteredTopics.map((topic, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {topic.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{topic.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No help topics found.
          </Typography>
        </Paper>
      )}
    </Box>
    <Footer />
    </>
  );
}
