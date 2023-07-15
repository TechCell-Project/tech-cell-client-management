"use client";

import React from "react";
import { Button, useTheme, SxProps } from "@mui/material";

interface IButtonCustom {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  content?: string;
  variant: "outlined" | "contained";
  disabled?: boolean;
}

export const ButtonCustom = (props: IButtonCustom) => {
  const theme = useTheme();

  const outlinedStyle: SxProps = {
    color: `${theme.color.red} !important`,
    border: `1px solid ${theme.color.red} !important`,
    textTransform: "unset",
    padding: "5px 20px",
    width: "max-content",
  };

  const containedStyle: SxProps = {
    bgcolor: `${theme.color.red} !important`,
    border: `1px solid ${theme.color.red} !important`,
    color: "#fff !important",
    textTransform: "unset",
    padding: "5px 20px",
  };

  return (
    <Button
      type={props.type || "button"}
      onClick={props.handleClick}
      sx={props.variant === "outlined" ? outlinedStyle : containedStyle}
      disabled={props.disabled}
    >
      {props.content}
    </Button>
  );
};
