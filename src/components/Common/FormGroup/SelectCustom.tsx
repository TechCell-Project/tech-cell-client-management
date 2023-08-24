"use client";

import { MenuItem, TextField } from "@mui/material";
import React from "react";

interface Props {
  name: string;
  options: any[];
  // size?: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>;
  content?: string;
  disabled?: boolean;
  disabledItem?: boolean;
  styles?: React.CSSProperties;
  value?: any;
  defaultValue?: any;
  error?: boolean;
  helperText?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const SelectCustom = (props: Props) => {
  return (
    <TextField
      id={props.name}
      name={props.name}
      value={props.value}
      select
      label={props.content}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      variant="outlined"
      error={props.error}
      helperText={props.helperText}
      size="small"
      fullWidth
      sx={{ ...props.styles }}
      disabled={props.disabled}
    >
      {props.options.map((option, i) => (
        <MenuItem key={i} value={option.value} disabled={props.disabledItem}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
