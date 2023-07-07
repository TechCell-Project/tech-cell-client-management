import { GridLocaleText } from "@mui/x-data-grid";

export const COLUMNS_ACCOUNT = [
    { field: 'no', headerName: 'STT', width: 70 },
    { field: 'name', headerName: 'Họ Và Tên', width: 250 },
    { field: 'role', headerName: 'Vai Trò', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
];

export const VI_VN_LOCALE: Partial<GridLocaleText> = {
  // Density
  toolbarDensity: 'Kích Thước',
  toolbarDensityCompact: 'Nhỏ',
  toolbarDensityStandard: 'Vừa',
  toolbarDensityComfortable: 'Rộng',
  toolbarQuickFilterPlaceholder: 'Tìm kiếm',

  // Export
  toolbarExport: 'Xuất',
  toolbarExportCSV: 'Xuất Excel',
  toolbarExportPrint: 'In',

  // Filter
  toolbarFilters: 'Lọc',
  filterOperatorContains: 'Chứa',
  filterOperatorEquals: 'Bằng',
  filterOperatorStartsWith: 'Bắt đầu với',
  filterOperatorEndsWith: 'Kết thúc với',
  filterOperatorIsEmpty: 'Trống',
  filterOperatorIsNotEmpty: 'Không trống',
  filterOperatorIsAnyOf: 'Bất kỳ trong số',
  filterPanelOperator: 'Lọc theo',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: '...',
  noResultsOverlayLabel: 'Không có kết quả được tìm thấy !',

  // Colums
  toolbarColumns: 'Cột',
  columnsPanelTextFieldLabel: 'Tìm cột',
  columnsPanelTextFieldPlaceholder: 'Tên cột',
  columnsPanelHideAllButton: 'Ẩn',
  columnsPanelShowAllButton: 'Hiện',

  noRowsLabel: 'Không có dữ liệu',
};