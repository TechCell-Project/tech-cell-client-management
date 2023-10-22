import React, { memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { formatDateViVN, getRole } from '@utils/index';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { useAppSelector } from '@store/store';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const DetailsAccount = memo((props: Props) => {
  const theme = useTheme();
  const { account, isLoadingDetails } = useAppSelector((state) => state.account);

  return (
    <ShowDialog
      dialogTitle="Thông tin tài khoản"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
    >
      <Box
        sx={{
          width: '100%',
          marginTop: '10px',
          textAlign: isLoadingDetails ? 'center' : 'left',
        }}
      >
        {isLoadingDetails ? (
          <CircularProgress sx={{ color: theme.color.red }} />
        ) : (
          <>
            <Grid container columnSpacing={2} rowSpacing={3}>
              <Grid item md={6}>
                <TextField
                  label="Họ và tên"
                  value={`${account?.firstName} ${account?.lastName}`}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Vai trò"
                  value={getRole(account?.role) || ''}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Email"
                  value={account?.email}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                    endAdornment: account?.emailVerified && (
                      <InputAdornment position="end">
                        <CheckCircleRoundedIcon fontSize="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Trạng thái tài khoản"
                  value={account?.block && account?.block.isBlocked ? 'Bị chặn' : 'Hoạt động'}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Thời gian tạo"
                  value={formatDateViVN(account?.createdAt || '')}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Thời gian chỉnh sửa"
                  value={formatDateViVN(account?.updatedAt || '')}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              {account?.address && (
                <>
                  <Grid item md={4}>
                    <TextField
                      label="Tỉnh, Thành phố"
                      value={account?.address[0]?.provinceLevel || '...'}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Quận, Huyện"
                      value={account?.address[0]?.districtLevel || '...'}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Phường, Xã"
                      value={account?.address[0]?.wardLevel || '...'}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      label="Đia chỉ cụ thể"
                      value={account?.address[0]?.detail || '...'}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{ readOnly: true }}
                      multiline
                      minRows={2}
                      maxRows={4}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Stack alignItems="flex-end" sx={{ marginTop: '20px' }}>
              <ButtonCustom variant="outlined" handleClick={props.handleClose} content="Đóng" />
            </Stack>
          </>
        )}
      </Box>
    </ShowDialog>
  );
});
