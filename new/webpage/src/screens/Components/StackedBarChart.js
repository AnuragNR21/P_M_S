import React from 'react';
import { Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';



const barChartsParams = {
  series: [
    { id: 'series-1', data: [3, 4, 1, 6, 5], label: 'A', stack: 'total', highlightScope: { highlight: 'item' }, color: '#FFA500' },
    { id: 'series-2', data: [4, 3, 1, 5, 8], label: 'B', stack: 'total', highlightScope: { highlight: 'item' }, color: '#f8b878' },
    { id: 'series-3', data: [4, 2, 5, 4, 1], label: 'C', highlightScope: { highlight: 'item' }, color: '#ffc87c' },
  ],
  xAxis: [{ data: ['0', '3', '6', '9', '12'], scaleType: 'band', id: 'axis1' }],
  height: 400,
};

export const StackedBarChart = () => (
  <Paper elevation={3} sx={{ flexBasis: '67%', p: 2, boxShadow: 4, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
    <BarChart {...barChartsParams} />
  </Paper>
);
