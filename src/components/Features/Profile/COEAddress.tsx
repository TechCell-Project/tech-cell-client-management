import { DialogAction } from '@interface/common';
import { Address } from '@models/Account';
import React, { memo, useEffect, useState } from 'react';
import { District, Province, Ward } from '@models/Location';
import { getDistrict, getProvince, getWard } from '@services/locationService';
import { AutocompleteCustom, ButtonCustom, ShowDialog, TextFieldCustom } from '@components/Common';
import { Form, Formik, FormikHelpers } from 'formik';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { profileAddressValidate } from '@validate/profile.validate';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ProfileAddressRequest } from '@models/Profile';
import { patchProfileAddress } from '@services/profileService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@store/slices/authSlice';
import { HttpStatusCode } from 'axios';

interface COEProps extends DialogAction {
  data: Address;
  index: number;
}

const COEAddress = memo(({ isOpen, handleClose, data, index }: COEProps) => {
  const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
  const [districts, setDistricts] = useState<Array<District>>(new Array<District>());
  const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    getProvince()
      .then(({ data }) => setProvinces(data))
      .catch(() => setProvinces(new Array<Province>()));

    if (data.provinceLevel !== null) {
      loadDistricts(String((data.provinceLevel as Province).province_id));
    }

    if (data.districtLevel !== null) {
      loadWards(String((data.districtLevel as District).district_id));
    }
  }, []);

  const loadDistricts = (province_id: string) => {
    getDistrict(province_id)
      .then(({ data }) => setDistricts(data))
      .catch(() => setDistricts(new Array<District>()));
  };

  const loadWards = (district_id: string) => {
    getWard(district_id)
      .then(({ data }) => setWards(data))
      .catch(() => setWards(new Array<Ward>()));
  };

  const handleSubmit = (values: Address, { setSubmitting }: FormikHelpers<Address>) => {
    let cloneAddress = [...user?.address as Address[]];

    if (index === null) {
      cloneAddress.push(values);
    } else {
      cloneAddress[index] = values;
    }

    const payload = new ProfileAddressRequest(cloneAddress);
    patchProfileAddress(payload)
      .then(() => {
        toast.success(`${index === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thành công!`);
        dispatch(getCurrentUser()).then();
      })
      .catch((error) => {
        if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
          toast.error(`${index === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thất bại!`);
        }
      })
      .finally(() => {
        setSubmitting(false);
        handleClose();
      });
  };

  return (
    <ShowDialog
      dialogTitle={`${index === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ`}
      isOpen={isOpen}
      handleClose={handleClose}
      dialogStyle={{ minWidth: { lg: '60%', xs: '80%' } }}
    >
      <Formik
        initialValues={data}
        enableReinitialize
        validationSchema={profileAddressValidate}
        onSubmit={handleSubmit}
      >
        {({ setValues, values, isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <AutocompleteCustom<Province>
                  name={`provinceLevel`}
                  isNotCheckbox
                  label='Tỉnh / thành'
                  options={provinces}
                  displayLabel='province_name'
                  displaySelected='province_id'
                  handleChange={(value) => {
                    if (value !== null) {
                      loadDistricts(String((value as Province).province_id));
                    }
                    setValues(prev => {
                      const newValue = { ...prev };

                      newValue.provinceLevel = value;
                      newValue.districtLevel = null;
                      newValue.wardLevel = null;

                      return newValue;
                    });
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <AutocompleteCustom<District>
                  name={`districtLevel`}
                  label='Quận / huyện'
                  isNotCheckbox
                  options={districts}
                  displayLabel='district_name'
                  displaySelected='district_id'
                  handleChange={(value) => {
                    if (value !== null) {
                      loadWards(String((value as District).district_id));
                    }
                    setValues(prev => {
                      const newValue = { ...prev };

                      newValue.districtLevel = value;
                      newValue.wardLevel = null;

                      return newValue;
                    });
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <AutocompleteCustom<Ward>
                  name={`wardLevel`}
                  label='Xã / phường'
                  isNotCheckbox
                  options={wards}
                  displayLabel='ward_name'
                  displaySelected='ward_code'
                />
              </Grid>
              <Grid item md={4}>
                <TextFieldCustom
                  name={`addressName`}
                  label='Địa chỉ'
                  placeholder='Nhà, công ty,...'
                />
              </Grid>
              <Grid item md={4}>
                <TextFieldCustom name={`customerName`} label='Tên khách hàng' />
              </Grid>
              <Grid item md={4}>
                <TextFieldCustom name={`phoneNumbers`} label='Số điện thoại' type='number' />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextFieldCustom
                  name={`detail`}
                  label='Địa chỉ cụ thể'
                  isTextArea
                  minRowArea={2}
                  maxRowArea={3}
                />
              </Grid>
            </Grid>

            <Stack direction='row' justifyContent='flex-end' gap={1} mt={2}>
              <ButtonCustom
                content='Hủy bỏ'
                variant='outlined'
                handleClick={handleClose}
              />
              <ButtonCustom
                content='Lưu'
                variant='contained'
                type='submit'
                disabled={isSubmitting}
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
});

export default COEAddress;