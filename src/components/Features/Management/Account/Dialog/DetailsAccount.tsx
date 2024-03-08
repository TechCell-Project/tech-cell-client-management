import React, { memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { formatDateViVN, getAddressLocation, getRole, getStatusAccount } from '@utils/index';
import { ButtonCustom, ShowDialog, TextViewCustom } from '@components/Common';
import { useAppSelector } from '@store/store';
import { DialogAction } from '@interface/common';

export const DetailsAccount = memo((props: DialogAction) => {
  const theme = useTheme();
  const { account, isLoadingDetails } = useAppSelector((state) => state.account);

  return (
    <ShowDialog
      dialogTitle="Thông tin tài khoản"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: '45%' }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: isLoadingDetails ? 'center' : 'left',
        }}
      >
        {isLoadingDetails ? (
          <CircularProgress sx={{ color: theme.color.red }} />
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={1}>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>1. Thông tin</p>
              </Grid>
              <Grid item md={12}>
                <TextViewCustom
                  label="Email"
                  content={String(account?.email)}
                  unit={
                    account?.emailVerified && (
                      <CheckCircleRoundedIcon fontSize="small" color="primary" />
                    )
                  }
                  stylesLabel={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                />
              </Grid>
              <Grid item md={6}>
                <TextViewCustom
                  label="Họ và tên"
                  content={`${account?.firstName} ${account?.lastName}`}
                />
              </Grid>
              <Grid item md={6}>
                <TextViewCustom label="Vai trò" content={getRole(account?.role) ?? ''} />
              </Grid>
              <Grid item md={6}>
                <TextViewCustom
                  label="Trạng thái TK"
                  content={getStatusAccount(account?.block?.isBlocked)}
                />
              </Grid>
              <Grid item md={6}>
                <TextViewCustom
                  label="Thời gian tạo"
                  content={formatDateViVN(account?.createdAt ?? '')}
                />
              </Grid>
              <Grid item md={6}>
                <TextViewCustom
                  label="Thời gian chỉnh sửa"
                  content={formatDateViVN(account?.updatedAt ?? '')}
                />
              </Grid>
              <Grid item xs={12} my={1}>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>2. Địa chỉ mặc định</p>
              </Grid>

              {account?.address && account?.address.length > 0 ? (
                account?.address.map((item) => {
                  return (
                    item.isDefault && (
                      <>
                        <Grid item xs={12}>
                          <TextViewCustom label="Loại" content={String(item.addressName)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextViewCustom label="Địa chỉ" content={getAddressLocation(item)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextViewCustom label="SDT" content={String(item.phoneNumbers)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextViewCustom label="Chi tiết" content={String(item.detail)} />
                        </Grid>
                      </>
                    )
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>
                    Tài khoản này chưa có địa chỉ!
                  </p>
                </Grid>
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
