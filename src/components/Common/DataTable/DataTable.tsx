"use client";

import React, { FC } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IDataTable } from "@interface/common";
import { VI_VN_LOCALE } from "@constants/data";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverLay";
import { CustomPagination } from "./CustomPagination";
import { CustomLoadingOverLay } from "./CustomLoadingOverLay";

export const DataTable: FC<IDataTable> = (props) => {
  return (
    <Box sx={{ height: 600, width: 1 }}>
      <DataGrid
        disableRowSelectionOnClick
        columns={props.column || []}
        rows={props.row || []}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        pagination
        loading={props.isLoading}
        localeText={VI_VN_LOCALE}
        slots={{
          toolbar: GridToolbar,
          pagination: CustomPagination,
          noRowsOverlay: CustomNoRowsOverlay,
          noResultsOverlay: CustomNoRowsOverlay,
          loadingOverlay: CustomLoadingOverLay,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          padding: "15px 20px 0 20px",
          borderRadius: 2,
          gap: "15px",
          border: 0,
          bgcolor: "#fff",
          opacity: props.isLoading ? 0.6 : 1,
          pointerEvents: props.isLoading ? "none" : "auto",
        }}
      />
    </Box>
  );
};
