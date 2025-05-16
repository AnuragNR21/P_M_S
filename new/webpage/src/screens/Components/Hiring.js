import React from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MainAppBar from "./MainAppBar";
import Footer from "./Footer";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    description: "Work with React and TypeScript on exciting projects.",
    salary: "20k - 40k",
  },
  {
    title: "Backend Engineer",
    company: "CodeWorks",
    location: "Bangalore, India",
    description: "Build scalable APIs using Node.js and Express.",
    salary: "30k - 50k",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "San Francisco, CA",
    description: "Design engaging interfaces and user experiences.",
    salary: "50k - 70k",
  },
];

export default function Hiring() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <MainAppBar />
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 8, sm: 10 },
          background: "linear-gradient(135deg, #ffe0b2 0%, #ffccbc 100%)",
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{ py: { xs: 4, sm: 6 }, textAlign: "center", background: "#fad7a0" }}
        >
          <Typography variant={isXs ? "h4" : "h3"} gutterBottom>
            Find Your Next Hire
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            The best place to post jobs and discover top talent.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Post a Job
          </Button>
        </Box>

        {/* Job Listings */}
        <Box sx={{ width: "100%", py: 5 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ px: 3, textAlign: "center" }}
          >
            Latest Jobs
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
          >
            {jobs.map((job, index) => (
              <Grid item key={index} sx={{ width: '30%', minWidth: '280px' }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 4,
                    background:
                      "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                    transition: "transform 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {job.company} — {job.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {job.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ mt: 1 }}
                    >
                      Salary: {job.salary}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
