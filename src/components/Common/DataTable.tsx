'use client';

import React, { FC } from 'react';
import { Box } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
    DataGrid,
    GridToolbar,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { IDataTable } from '@interface/common';
import { CustomNoRowsOverlay } from '@styled-mui/dataTable';
import { VI_VN_LOCALE } from '@constants/data';

const Pagination = ({
    page,
    onPageChange,
    className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
};

const CustomPagination = (props: any) => {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export const DataTable: FC<IDataTable> = (props) => {
    return (
        <Box sx={{ height: 550, width: 1 }}>
            <DataGrid
                disableRowSelectionOnClick
                columns={props.column || []}
                rows={props.row || []}
                slots={{
                    toolbar: GridToolbar,
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                    noResultsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                pagination
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
                localeText={VI_VN_LOCALE}
                sx={{
                    padding: '15px 20px 0 20px',
                    borderRadius: 2,
                    gap: '15px',
                    border: 0,
                    bgcolor: '#fff',
                }}
            />
        </Box>
    );
};
