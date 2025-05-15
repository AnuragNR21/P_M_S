import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MainAppBar from "./MainAppBar";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: "linear-gradient(135deg, rgb(254, 248, 206), rgb(249, 143, 61))",
  minHeight: "100vh",
  overflowY: "auto",
  paddingTop: "80px", // Ensure content starts below AppBar
}));

const PerformanceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff3e0",
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3),
}));

export default function Performance() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    dept: "",
    title: "",
    manager: "",
    periodStart: "",
    periodEnd: "",
    attend: "",
    tasks: "",
    quality: "",
    productivity: "",
    communication: "",
    problemSolving: "",
    trainings: "",
    collaboration: "",
    feedback: "",
    bonus: "",
    finalRating: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews((prev) => [...prev, formData]);
    alert("Review submitted!");
    setFormData({
      name: "",
      id: "",
      dept: "",
      title: "",
      manager: "",
      periodStart: "",
      periodEnd: "",
      attend: "",
      tasks: "",
      quality: "",
      productivity: "",
      communication: "",
      problemSolving: "",
      trainings: "",
      collaboration: "",
      feedback: "",
      bonus: "",
      finalRating: "",
    });
  };

  const renderTextField = (props) => (
    <TextField fullWidth {...props} onChange={handleChange} />
  );

  return (
    <>
      <MainAppBar />
      <StyledContainer>
        <PerformanceCard component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" mb={2}>
            Review Summary
          </Typography>

          <Grid
            container
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            {["name", "id", "dept"].map((field) => (
              <Grid item key={field}>
                {renderTextField({
                  name: field,
                  label: field.charAt(0).toUpperCase() + field.slice(1),
                  type: field === "id" ? "text" : "text",
                  value: formData[field],
                })}
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            mt={1}
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            {["title", "manager", "periodStart", "periodEnd"].map((field) => (
              <Grid item key={field}>
                {renderTextField({
                  name: field,
                  type: field.includes("period") ? "date" : "text",
                  label:
                    field === "periodStart"
                      ? "Start"
                      : field === "periodEnd"
                      ? "End"
                      : field.charAt(0).toUpperCase() + field.slice(1),
                  InputLabelProps: field.includes("period") ? { shrink: true } : undefined,
                  value: formData[field],
                })}
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" mt={4} mb={2}>
            KPI
          </Typography>
          <Grid
            container
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            {[{ name: "attend", label: "Attendance", type: "number" },
              { name: "tasks", label: "Tasks (%)", type: "number" },
              { name: "productivity", label: "Productivity", type: "text" }
            ].map(({ name, label, type }) => (
              <Grid item key={name}>
                {renderTextField({ name, label, type, value: formData[name] })}
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" mt={4} mb={2}>
            Behavior
          </Typography>
          <Grid
            container
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            {["quality", "communication", "problemSolving", "finalRating"].map((field) => (
              <Grid item key={field}>
                <TextField
                  select
                  fullWidth
                  name={field}
                  label={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="Poor">Poor</option>
                  <option value="Good">Good</option>
                  <option value="Better">Better</option>
                  <option value="Excellent">Excellent</option>
                </TextField>
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            mt={1}
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            <Grid item>
              {renderTextField({
                name: "trainings",
                label: "Trainings",
                multiline: true,
                rows: 2,
                value: formData.trainings,
              })}
            </Grid>
            <Grid item>
              {renderTextField({
                name: "collaboration",
                label: "Collaboration",
                multiline: true,
                rows: 2,
                value: formData.collaboration,
              })}
            </Grid>
          </Grid>

          <Grid
            container
            mt={1}
            sx={{
              display: "grid",
              gap: (theme) => `${theme.spacing(2)} ${theme.spacing(2)}`,
            }}
          >
            <Grid item>
              {renderTextField({
                name: "feedback",
                label: "Manager Feedback",
                multiline: true,
                rows: 3,
                value: formData.feedback,
              })}
            </Grid>
            <Grid item>
              {renderTextField({
                name: "bonus",
                label: "Bonus Recommendation",
                multiline: true,
                rows: 3,
                value: formData.bonus,
              })}
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#f79635" }}>
              Submit
            </Button>
          </Box>
        </PerformanceCard>

        <TableContainer component={Paper} sx={{ borderRadius: 4, mt: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f79635" }}>
              <TableRow>
                {[
                  "Name", "ID", "Department", "Title", "Manager",
                  "Period Start", "Period End", "Attendance", "Tasks",
                  "Productivity", "Quality", "Communication",
                  "Problem Solving", "Trainings", "Collaboration",
                  "Feedback", "Bonus", "Final Rating",
                ].map((head) => (
                  <TableCell key={head}>
                    <b>{head}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review, idx) => (
                <TableRow key={idx}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.dept}</TableCell>
                  <TableCell>{review.title}</TableCell>
                  <TableCell>{review.manager}</TableCell>
                  <TableCell>{review.periodStart}</TableCell>
                  <TableCell>{review.periodEnd}</TableCell>
                  <TableCell>{review.attend}</TableCell>
                  <TableCell>{review.tasks}</TableCell>
                  <TableCell>{review.productivity}</TableCell>
                  <TableCell>{review.quality}</TableCell>
                  <TableCell>{review.communication}</TableCell>
                  <TableCell>{review.problemSolving}</TableCell>
                  <TableCell>{review.trainings}</TableCell>
                  <TableCell>{review.collaboration}</TableCell>
                  <TableCell>{review.feedback}</TableCell>
                  <TableCell>{review.bonus}</TableCell>
                  <TableCell>{review.finalRating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
    </>
  );
}
