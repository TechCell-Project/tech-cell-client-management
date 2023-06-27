import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

interface Props {
    name: string;
    role: string;
}

const UserBoxHeader = (props: Props) => {
    return (
        <Stack direction="row" alignItems="center" gap="10px">
            <Avatar>
                <PersonRoundedIcon />
            </Avatar>
            <Stack direction="column">
                <Typography variant="h6" fontSize={16} fontWeight={700}>
                    {props.name}
                </Typography>
                <Typography variant="body1" fontSize={12}>
                    {props.role}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default UserBoxHeader;
