import React from "react";
import { Box, useTheme, LinearProgress } from "@mui/material";

export const CustomLoadingOverLay = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiLinearProgress-root": {
          bgcolor: theme.color.lightRed,
        },
        "& .MuiLinearProgress-root .MuiLinearProgress-bar": {
          bgcolor: theme.color.red,
        },
      }}
    >
      <LinearProgress/>
    </Box>
  );
};
