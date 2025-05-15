import React, { useState } from 'react';
import {
  Box, Typography, useMediaQuery, Dialog, DialogTitle, DialogContent,
  TextField, Button, IconButton, Fab, ToggleButton, ToggleButtonGroup,
  MenuItem, Select
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MainAppBar from './MainAppBar';

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    title: 'Monthly Payroll',
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  backgroundImage: 'linear-gradient(135deg,rgb(254, 248, 206),rgb(249, 143, 61))',
  minHeight: '100vh',
  width: '100%',
  boxSizing: 'border-box',
}));

const AddEventFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: '#fbab60',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f57c00',
  },
}));

const CustomToolbar = ({ onNavigate, label, onView, view }) => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const handleSearch = () => {
    const date = new Date(year, month, 1);
    onNavigate('DATE', date);
  };

  const monthNames = moment.months(); // ['January', ..., 'December']

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
      {/* Navigation Buttons */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => onNavigate('PREV')}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={() => onNavigate('NEXT')}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Month/Year Selection */}
      <Box display="flex" gap={1} alignItems="center">
        <Select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          size="small"
          sx={{ width: 140, backgroundColor: 'white', borderRadius: 1 }}
        >
          {monthNames.map((name, index) => (
            <MenuItem key={index} value={index}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          // label="Year"
          type="number"
          size="small"
          InputProps={{ inputProps: { min: 1900, max: 2100 } }}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{ width: 120, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button onClick={handleSearch} variant="contained" sx={{ backgroundColor: '#fbab60', color: 'black' }}>
          Go
        </Button>
      </Box>

      {/* View Switcher */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => newView && onView(newView)}
        size="small"
        sx={{ backgroundColor: 'white', borderRadius: 2 }}
      >
        <ToggleButton value="day">Daily</ToggleButton>
        <ToggleButton value="week">Weekly</ToggleButton>
        <ToggleButton value="month">Monthly</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default function PayrollCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const handleSelectSlot = ({ start, end }) => {
    if (!isMobile) {
      setNewEvent({ ...newEvent, start, end });
      setOpen(true);
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([...events, newEvent]);
    }
    setOpen(false);
    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <>
      <MainAppBar />
      <StyledContainer>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Payroll Calendar
        </Typography>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={!isMobile}
          onSelectSlot={handleSelectSlot}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          style={{ height: 600, backgroundColor: '#fff3e0', borderRadius: 10, padding: 10 }}
          eventPropGetter={() => ({
            style: {
              backgroundColor: '#fbab60',
              color: 'black',
              borderRadius: '8px',
              border: 'none',
              padding: '4px 8px',
            },
          })}
          components={{
            toolbar: (props) => (
              <CustomToolbar {...props} onView={props.onView} view={currentView} />
            ),
            event: ({ event }) => <div>{event.title}</div>,
          }}
        />

        {isMobile && (
          <AddEventFab onClick={() => setOpen(true)}>
            <AddIcon />
          </AddEventFab>
        )}

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>
            Add Payroll Event
            <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Event Title"
              fullWidth
              margin="dense"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              type="datetime-local"
              label="Start"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={newEvent.start ? moment(newEvent.start).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
            />
            <TextField
              type="datetime-local"
              label="End"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={newEvent.end ? moment(newEvent.end).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogContent>
        </Dialog>
      </StyledContainer>
    </>
  );
}
