import React, { FC } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { IUserBox } from '@interface/navigation';

const UserBoxHeader: FC<IUserBox> = (props) => {
    return (
        <Stack direction="row" alignItems="center" gap="10px">
            <Avatar>
                <PersonRoundedIcon />
            </Avatar>
            <Stack direction="column">
                <Typography variant="h6" fontSize={16} fontWeight={700}>
                    {props.name}
                </Typography>
                <Typography variant="body1" fontSize={12} fontWeight={600} sx={{opacity: 0.7}}>
                    {props.role}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default UserBoxHeader;
