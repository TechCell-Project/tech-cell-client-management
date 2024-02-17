import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function NotSupportMobile() {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      p={5}
      position='relative'
    >
      <Image
        src='/logo-red.png'
        alt='Login Logo'
        width={150}
        height={50}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      />
      <Box sx={{ width: '100%', height: 'auto' }}>
        <Image
          width={350}
          height={350}
          src='/not-support.jpg'
          alt='not-support'
          style={{ objectFit: 'cover', margin: 'auto' }}
        />
      </Box>
      <Typography
        fontFamily='Montserrat, sans-serif'
        fontWeight={600}
        textAlign='center'
      >
        Website không hỗ trợ trên các thiết bị mobile!
      </Typography>
      <Typography
        fontFamily='Montserrat, sans-serif'
        fontWeight={500}
        mt={1}
        fontSize={14}
        textAlign='center'
      >
        Vui lòng sử dụng desktop browser
      </Typography>
    </Box>
  );
}
