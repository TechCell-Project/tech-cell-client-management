import React, { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import Grid from '@mui/material/Grid';
import { ButtonCustom, TextViewCustom } from '@components/Common';
import { ProfileAddressRequest } from '@models/Profile';
import { Address } from '@models/Account';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { getCurrentUser } from '@store/slices/authSlice';
import { toast } from 'react-toastify';
import { patchProfileAddress } from '@services/profileService';
import { HttpStatusCode } from 'axios';
import COEAddress from './COEAddress';
import CFDeleteAddress from './CFDeleteAddress';
import { getAddressLocation } from '@utils/funcs';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export const ProfileAddress = memo(({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addressIndex, setAddressIndex] = useState<number | null>(null);

  const handleSetDefault = (index: number) => {
    const newValue: Array<Address> | undefined = user?.address.map((item, i) => ({
      ...item,
      isDefault: i === index,
    }));
    if (newValue) {
      const values = new ProfileAddressRequest(newValue);

      patchProfileAddress(values)
        .then(() => {
          toast.success('Đổi địa chỉ mặc định thành công!');
          dispatch(getCurrentUser()).then();
        })
        .catch((error) => {
          if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
            toast.error('Đổi địa chỉ mặc định thất bại!');
          }
        });
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        {user?.address?.length !== 0 ? (
          user?.address?.map((item, i) => (
            <React.Fragment key={item.addressName}>
              <Grid item xs={12}>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Stack
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={2}
                  >
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>
                      {i + 1}. {item.addressName}
                    </p>
                    {item.isDefault ? (
                      <CheckCircleRoundedIcon fontSize="small" color="primary" />
                    ) : (
                      <ButtonCustom
                        variant="text"
                        content="Chọn làm mặc định"
                        handleClick={() => handleSetDefault(i)}
                      />
                    )}
                  </Stack>
                  <Stack flexDirection="row" alignItems="center" gap="5px">
                    <IconButton
                      onClick={() => {
                        setCurrentAddress(item);
                        setAddressIndex(i);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setOpenConfirm(true);
                        setAddressIndex(i);
                      }}
                    >
                      <RemoveCircleRoundedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize="18px">
                  {item.customerName} &nbsp;|&nbsp; {item.phoneNumbers}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextViewCustom label="Địa chỉ" content={getAddressLocation(item)} />
              </Grid>
              <Grid item xs={12}>
                <TextViewCustom label="Địa chỉ cụ thể" content={String(item.detail)} />
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <Grid item xs={12}>
            <Stack flexDirection="column" gap="10px" alignItems="center" justifyContent="center">
              <Image
                width={250}
                height={250}
                src="/empty.png"
                alt="Empty address"
                style={{ objectFit: 'contain' }}
              />
              <Typography variant="body2" fontWeight={500}>
                Bạn chưa có địa chỉ nào!
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>

      <Stack direction="row" justifyContent="flex-end" gap={1} mt={2}>
        <ButtonCustom content="Hủy bỏ" variant="outlined" handleClick={handleClose} />
        <ButtonCustom
          content="Thêm địa chỉ"
          variant="contained"
          handleClick={() => setCurrentAddress(new Address())}
        />
      </Stack>

      {Boolean(currentAddress) && (
        <COEAddress
          isOpen={Boolean(currentAddress)}
          handleClose={() => {
            setCurrentAddress(null);
            setAddressIndex(null);
          }}
          data={currentAddress as Address}
          index={addressIndex as number}
        />
      )}

      {openConfirm !== null && (
        <CFDeleteAddress
          isOpen={openConfirm}
          handleClose={() => {
            setOpenConfirm(false);
            setAddressIndex(null);
          }}
          addressIndex={addressIndex as number}
        />
      )}
    </>
  );
});
