'use client';

import React, { memo, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  content: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  conditionHelper?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  styles?: React.CSSProperties;
}

export const PasswordCustom = memo((props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel htmlFor={props.content} error={props.error}>
        {props.content}
      </InputLabel>
      <OutlinedInput
        sx={{ ...props.styles }}
        size="small"
        id={props.name}
        name={props.name}
        type={showPassword ? 'text' : 'password'}
        error={props.error}
        label={props.content}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.conditionHelper && (
        <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
});
