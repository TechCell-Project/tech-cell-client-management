"use client";

import { MenuItem, TextField } from "@mui/material";
import React, { memo } from "react";

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
  displayOption?: string;
  displayValue?: string;
}

export const SelectCustom = memo((props: Props) => {
  const { displayOption = "label", displayValue = "value" } = props;
  
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
      sx={{
        ...props.styles,
        "& .MuiInputBase-root .MuiSelect-select": {
          maxHeight: "20px",
        },
      }}
      disabled={props.disabled}
    >
      {props.options.map((option) => (
        <MenuItem
          key={option[displayValue]}
          value={option[displayValue]}
          disabled={props.disabledItem}
        >
          {option[displayOption]}
        </MenuItem>
      ))}
    </TextField>
  );
});
