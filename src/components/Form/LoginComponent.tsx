'use client';

import Image from 'next/image';
import React from 'react';
import styles from 'styles/components/_login.module.scss';
import { Button, Stack, TextField, FormControlLabel, Checkbox, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import PasswordInputComponent from './PasswordInputComponent';

const LoginComponent = () => {
    const { color } = useTheme();
    return (
        <div className={styles.login}>
            <Image
                src="/login-bg.png"
                alt="Login Banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto', top: 0 }}
            />
            <div className={styles.loginLogo}>
                <Image src="/logo-red.png" alt="Login Logo" width={150} height={50} />
            </div>
            <div className={styles.loginForm}>
                <div className={styles.loginFormInput}>
                    <h1 className={styles.loginFormInputTitle}>Đăng nhập</h1>
                    <span className={styles.loginFormInputDesc}>
                        Nhập tài khoản và mật khẩu để đăng nhập!
                    </span>
                    <Stack direction="column">
                        <TextField
                            id="username"
                            fullWidth
                            label="Tài khoản"
                            variant="standard"
                            sx={{ mb: 3 }}
                        />
                        <PasswordInputComponent />
                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label="Nhớ mật khẩu"
                            sx={{ mt: 1 }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                color: '#fff',
                                bgcolor: color.red,
                                boxShadow: 'none',
                                textTransform: 'capitalize',
                                fontWeight: 600,
                                '&:hover': {
                                    boxShadow: 'none',
                                    bgcolor: color.red,
                                },
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Stack>
                    {/* <Stack direction="column" gap={1} sx={{ mt: 6 }}>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <PublicIcon />
                            <a href="https://techcell.cloud/">TechCell</a>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <PhoneInTalkRoundedIcon />
                            0123456789
                        </Stack>
                    </Stack> */}
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default LoginComponent;
