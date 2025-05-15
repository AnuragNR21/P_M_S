import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

const fetchData = async () => {
  return [
    { date: '10 Mar', requests: 2 },
    { date: '11 Mar', requests: 4 },
    { date: '12 Mar', requests: 5 },
    { date: '13 Mar', requests: 3 },
    { date: '14 Mar', requests: 4 },
  ];
};

export const RequestsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <Card
      sx={{
        height: 400,
        width: '100%',
        flex: 1,
        flexShrink: 1,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginRight: 2,
        marginBottom: 2,
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 1, // ensures consistent internal spacing
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Requests
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Check the requests from employees
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f44336" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#333',
                  border: 'none',
                  color: '#fff',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#f44336"
                fillOpacity={1}
                fill="url(#colorRequests)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
