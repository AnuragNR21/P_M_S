import React from 'react';
import { Paper, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  ...theme.typography.body2,
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)',
    backgroundColor: 'rgb(245, 216, 162)',
    cursor: 'pointer',
  },
}));

export default function DemoPaperSection() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const demoData = [
    { title: 'Employees', value: 120, color: '#f28b82' },
    { title: 'Sales', value: '$24K', color: '#fbbc04' },
    { title: 'Tickets', value: 87, color: '#34a853' },
    { title: 'Alerts', value: 12, color: '#ea4335' },
  ];

  return (
    <Stack
      direction={isXs ? 'column' : 'row'}
      spacing={2}
      flexWrap="wrap"
      justifyContent="space-evenly"
      sx={{
        width: '100%',
        marginTop: theme.spacing(2),
      }}
    >
      {demoData.map((item, index) => (
        <DemoPaper
          key={index}
          sx={{
            flex: '1 1 200px',
            minWidth: '200px',
            height: 'auto',
            boxSizing: 'border-box',
            margin: theme.spacing(1),
            '&:not(style):not(style)': {
              margin: '8px',
            },
          }}
        >
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="h4" fontWeight="bold">{item.value}</Typography>
        </DemoPaper>
      ))}
    </Stack>
  );
}
