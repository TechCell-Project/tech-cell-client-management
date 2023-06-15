'use client';

import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Input,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInputComponent = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="password">Mật khẩu</InputLabel>
            <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default PasswordInputComponent;
