'use client';

import React, { FC, useEffect, useMemo, useState, ReactElement } from 'react';
import { Alert, AlertTitle, IconButton, Stack, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IAlert } from '@interface/common';

export const AlertMessage: FC<IAlert> = ({ type, status, message, timeout = 3000 }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const getStatus = useMemo(() => {
        switch (status) {
            case 1:
                return 'Thành công';
            case 2:
                return 'Thất bại';
            case 3:
                return 'Cảnh báo';
            default:
                return '';
        }
    }, [status]);

    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, timeout);

            return () => {
                clearTimeout(timer);
                setIsVisible(true);
            };
        }
    }, [timeout]);

    return (
        !undefined && (
            <Zoom in={isVisible} style={{ transitionDuration: '700ms' }}>
                <Stack
                    sx={{
                        position: 'fixed',
                        top: { sm: 30, xs: 10 },
                        right: { sm: 30, xs: 10 },
                        zIndex: 9999,
                    }}
                >
                    <Alert
                        severity={type}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setIsVisible(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>{getStatus}</AlertTitle>
                        <strong>{message}</strong>
                    </Alert>
                </Stack>
            </Zoom>
        )
    );
};

export const alertMsg = ({ type, status, message, timeout = 3000 }: IAlert): React.ReactElement => {
    return <AlertMessage type={type} status={status} message={message} timeout={timeout} />;
};
