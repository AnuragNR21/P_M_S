import React, { useRef, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const Sidebar = styled(Box)(({ theme }) => ({
  width: 220,
  position: 'fixed',
  top: 64,
  left: 3,
  right: 3,
  bottom: 4,
  backgroundImage: 'linear-gradient(135deg, rgb(254, 248, 206), rgb(249, 143, 61))',
  zIndex: 1200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  gap: theme.spacing(2),
  maxHeight: `calc(100vh - 64px)`,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const MenuItem = styled(Paper)(({ theme }) => ({
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: '#fbab60',
  color: 'black',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const menuItems = [
  { label: 'Dashboard', path: '/homes' },
  { label: 'PayrollCalendar', path: '/payrollcalendar' },
  { label: 'Task', path: '/task' },
  { label: 'HelpCenter', path: '/helpcenter' },
  { label: 'Performance', path: '/performance' },
  { label: 'Payroll', path: '/payroll' },
  { label: 'Employees', path: '/employeepage' },
  { label: 'Hiring', path: '/hiring' },
];

export default function VerticalAppBar() {
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!open) return null;

  return (
    <Sidebar ref={sidebarRef}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          elevation={12}
          onClick={() => navigate(item.path)}
        >
          <Typography variant="body1">{item.label}</Typography>
          <IconButton size="small" sx={{ color: 'black' }}>
            <ChevronRightIcon />
          </IconButton>
        </MenuItem>
      ))}
    </Sidebar>
  );
}
