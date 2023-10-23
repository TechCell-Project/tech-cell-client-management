import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useAppSelector } from '@store/store';

interface Props {
  name?: string | null;
  role?: string | null;
}

const UserBoxHeader: FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Stack direction='row' alignItems='center' gap='10px'>
      {Boolean(user?.avatar) ? (
        <Avatar src={user?.avatar} alt='User Avatar' sx={{ height: '45px', width: '45px' }} />
      ) : (
        <Avatar sx={{ height: '45px', width: '45px' }}>
          <PersonRoundedIcon />
        </Avatar>
      )}
      <Stack direction='column'>
        <Typography variant='h6' fontSize={16} fontWeight={700}>
          {props.name}
        </Typography>
        <Typography variant='body1' fontSize={12} fontWeight={600} sx={{ opacity: 0.7 }}>
          {props.role}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserBoxHeader;
