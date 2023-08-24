"use client";

import React, { memo, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

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
  const [showPassword, setPassword] = useState<boolean>(false);

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
        type={showPassword ? "text" : "password"}
        error={props.error}
        label={props.content}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setPassword((show) => !show)}
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
