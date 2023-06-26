import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const UserBoxHeader = () => {
    return (
        <Stack direction="row" alignItems="center" gap="10px">
            <Avatar>
                <PersonRoundedIcon />
            </Avatar>
            <Stack direction="column">
                <Typography variant="h6" fontSize={17} fontWeight={700}>
                    Admin Name
                </Typography>
                <Typography variant="body1" fontSize={12}>
                    Người quản lý
                </Typography>
            </Stack>
        </Stack>
    );
};

export default UserBoxHeader;
