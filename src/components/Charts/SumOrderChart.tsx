import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from './ReduceRecharts';
import Box from '@mui/material/Box';
import { Statistic } from '@models/Statistic';

const data = [
  { name: 'Đã xử lý', value: 25 },
  { name: 'Đang xử lý', value: 12 },
  { name: 'Chưa xử lý', value: 9 },
];

export const SumOrderChart = () => {
  return (
    <Box width='100%' height={300}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={300}>
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#FF6666'
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
