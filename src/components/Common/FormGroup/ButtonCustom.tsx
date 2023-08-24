"use client";

import React from "react";
import { Button, useTheme, SxProps } from "@mui/material";

interface IButtonCustom {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  variant: "outlined" | "contained" | "text";
  size?: "large" | "small" | "medium";
  content?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  styles?: React.CSSProperties;
  defaultValue?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  colorWhite?: boolean;
  hidden?: boolean;
}

export const ButtonCustom = (props: IButtonCustom) => {
  const theme = useTheme();

  const outlinedStyle: SxProps = {
    color: props.colorWhite ? "#fff !important" : `${theme.color.red} !important`,
    border: props.colorWhite ? "1px solid #fff !important" : `1px solid ${theme.color.red} !important`,
    textTransform: "unset",
    padding: "5px 20px",
    width: "max-content",
    whiteSpace: "nowrap",
  };

  const containedStyle: SxProps = {
    bgcolor: `${theme.color.red} !important`,
    border: `1px solid ${theme.color.red} !important`,
    color: "#fff !important",
    textTransform: "unset",
    padding: "5px 20px",
    whiteSpace: "nowrap",
  };

  const textStyle: SxProps = {
    color: props.colorWhite
      ? `#fff !important`
      : `${theme.color.red} !important`,
    bgcolor: "transparent",
    padding: "5px 20px",
    whiteSpace: "nowrap",
    textTransform: "unset",
  };

  const getVariant = () => {
    switch (props.variant) {
      case "contained":
        return containedStyle;
      case "outlined":
        return outlinedStyle;
      case "text":
        return textStyle;
      default:
        return null;
    }
  };

  return (
    <Button
      type={props.type || "button"}
      onClick={props.handleClick}
      sx={[{ ...props.styles }, getVariant()]}
      disabled={props.disabled}
      size={props.size}
      fullWidth={props.fullWidth}
      defaultValue={props.defaultValue}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      hidden={props.hidden}
    >
      {props.content}
    </Button>
  );
};