import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  gridFilteredTopLevelRowCountSelector,
  gridPageSizeSelector,
  GridPagination,
  useGridApiContext,
  useGridRootProps,
  useGridSelector,
} from '@mui/x-data-grid';

const getPageCount = (rowCount: number, pageSize: number): number => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }
  return 0;
};

const Pagination = ({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);
  const pageCount = getPageCount(rootProps.rowCount ?? visibleTopLevelRowCount, pageSize);

  return (
    <MuiPagination
      className={className}
      count={pageCount}
      page={page + 1}
      shape="rounded"
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
};

export const CustomPagination = (props: any) => {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
};
