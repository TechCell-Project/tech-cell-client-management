'use client';

import React, { FC, memo, useMemo } from 'react';
import { DataGrid, viVN } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from './CustomNoRowsOverLay';
import { CustomPagination } from './CustomPagination';
import { CustomLoadingOverLay } from './CustomLoadingOverLay';
import { DataTableProps } from '@models/Common';

export const DataTable: FC<DataTableProps> = memo((props) => {
  const styledTable = useMemo(() => {
    return {
      padding: '10px 20px',
      borderRadius: 2,
      gap: '15px',
      border: 0,
      bgcolor: '#fff',
      opacity: props.isLoading ? 0.6 : 1,
      pointerEvents: props.isLoading ? 'none' : 'auto',
      '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
        py: 1,
      },
      '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
        py: '12px',
      },
      '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
        py: '22px',
      },
    };
  }, [props.isLoading]);

  return (
    <div style={{ height: 680, width: '100%' }}>
      <DataGrid
        disableRowSelectionOnClick
        columns={props.column ?? []}
        rows={props.row ?? []}
        loading={props.isLoading}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 200}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          pagination: CustomPagination,
          noRowsOverlay: CustomNoRowsOverlay,
          noResultsOverlay: CustomNoRowsOverlay,
          loadingOverlay: CustomLoadingOverLay,
        }}
        pagination
        paginationMode="server"
        pageSizeOptions={[5, 10, 25, 50, 100]}
        rowCount={Number(props.totalRecord)}
        paginationModel={props.paginationModel}
        onPaginationModelChange={props.setPaginationModel}
        sx={styledTable}
        getRowId={(row) => row?._id}
      />
    </div>
  );
});
