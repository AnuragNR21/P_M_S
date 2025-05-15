import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const officeLocations = [
  {
    country: 'INDIA',
    address:
      'R R Towers 4th Floor, Plot no 188 & 189, Phase 11, Kavuri Hills, Madhapur, Hyderabad, Telangana 500033',
  },
  {
    country: 'SINGAPORE',
    address:
      '12 Marina Boulevard, 17-01 Tower 3, Marina Bay Financial Centre, Singapore 018982',
    phone: '+6565497044, +6565497001',
  },
  {
    country: 'USA',
    address: '1312 17th Street Unit #229 Denver, CO 80202',
    phone: '+17202639280',
  },
  {
    country: 'MALAYSIA',
    address:
      'Level 28, The Gardens South Tower, Mid Valley City, Lingkaran Syed Putra, 59200 Kuala Lumpur, Malaysia',
    phone: '+60322987135, +60322987333',
  },
  {
    country: 'UK LONDON',
    address: '8 61A, Bath Road, Reading, RG302 BB',
  },
  {
    country: 'PHILIPPINES',
    address:
      'Unit 301, 164 L. Gruet Street, Brgy Maytunas San Juan City, Philippines 1500',
  },
  {
    country: 'AUSTRALIA',
    address: '8 Beulah Road, Norwood SA 5067, Adelaide, Australia',
  },
  
];

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'transparent',
        py: 6,
        px: { xs: 2, sm: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#ffb876'
      }}
    >
      <Box textAlign="center" mb={4}>
        <img
          src="https://inovaantage.com/wp-content/uploads/2023/08/inovaantage-logo-footer1.png" // Replace with your actual logo path
          alt="Inovaantage Logo"
          style={{ height: "80px", marginLeft: 8, cursor: "pointer" }}
        />
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          Stay Digitally Ahead With Us
        </Typography>
        <Box mt={2}>
          <IconButton color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary">
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center" maxWidth="lg">
        {officeLocations.map((loc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                border: '2px solid #000000',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {loc.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📍 {loc.address}
              </Typography>
              {loc.phone && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  📞 {loc.phone}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Inovaantage. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
