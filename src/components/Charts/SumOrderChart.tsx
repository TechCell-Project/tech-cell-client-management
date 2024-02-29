import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from './ReduceRecharts';
import Box from '@mui/material/Box';
import { useAppSelector } from '@store/store';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { OrderStatusStats } from '@constants/enum';
import { orderStatusMapping } from '@utils/funcs';

const COLORS = [
  {
    type: OrderStatusStats.Pending,
    color: '#0088FE',
  },
  {
    type: OrderStatusStats.Cancelled,
    color: '#FF8042',
  },
  {
    type: OrderStatusStats.Processing,
    color: '#FFBB28',
  },
  {
    type: OrderStatusStats.Shipping,
    color: '#EDC79B',
  },
  {
    type: OrderStatusStats.Completed,
    color: '#00C49F',
  },
  {
    type: OrderStatusStats.Refunded,
    color: '#CA6680',
  },
];

const RenderRemindColor = ({ color, content }: { color: string, content: string }) => {
  return (
    <Stack flexDirection='row' gap={1} alignItems='center'>
      <Box sx={{ width: '10px', height: '10px', borderRadius: 8, backgroundColor: color }} />
      <Typography fontSize='12px' fontWeight={500}>{content}</Typography>
    </Stack>
  );
};

export const SumOrderChart = () => {
  const { statsOrder } = useAppSelector((state) => state.stats);

  const updatedData = statsOrder && statsOrder.data.map(item => {
    const colorObj = COLORS.find(color => color.type === item.name);
    if (colorObj) {
      return { ...item, color: colorObj.color, name: orderStatusMapping[item.name.toLowerCase()] };
    }
    return item;
  });

  return (
    <Box width='100%' height={300} mt={5}>
      {updatedData && (
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={400} height={300}>
            <Pie
              dataKey='value'
              data={updatedData}
              cx='50%'
              cy='50%'
              outerRadius={120}
              fill='#FF6666'
              label
            >
              {updatedData && updatedData.map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                );
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

      <Stack
        flexDirection='row'
        alignItems='center'
        gap={2}
        width='100%'
        justifyContent='flex-start'
        flexWrap='wrap'
        mt={3}
      >
        {updatedData && updatedData.map((item) => (
          <RenderRemindColor color={item.color} content={item.name} key={item.name} />
        ))}
      </Stack>
    </Box>
  );
};
