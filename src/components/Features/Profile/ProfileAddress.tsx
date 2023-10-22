import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { District, Province, Ward } from '@models/Location';
import { getDistrict, getProvince, getWard } from '@services/locationService';
import Grid from '@mui/material/Grid';
import { AutocompleteCustom, ButtonCustom, TextFieldCustom } from '@components/Common';
import { ProfileAddressRequest } from '@models/Profile';
import { Address, UserAccount } from '@models/Account';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { editProfileAddress } from '@store/slices/authSlice';
import { profileAddressValidate } from '@validate/profile.validate';

export const ProfileAddress = memo(({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
  const [initValues, setInitValues] = useState<ProfileAddressRequest>(
    new ProfileAddressRequest(user?.address as Array<Address>),
  );

  useEffect(() => {
    getProvince()
      .then(({ data }) => setProvinces(data))
      .catch(() => setProvinces(new Array<Province>()));
  }, []);

  useEffect(() => {
    if (user?.address && user?.address?.length > 0) {
      const newValue = user.address.map((item) => {
        const { province_id } = item.provinceLevel as Province;
        const { district_id } = item.districtLevel as District;

        getDistrict(String(province_id))
          .then(({ data }) => item.listDistrict = data)
          .catch(() => item.listDistrict = []);
        getWard(String(district_id))
          .then(({ data }) => item.listWard = data)
          .catch(() => item.listWard = []);

        return item;
      });

      setInitValues(new ProfileAddressRequest(newValue));
    }
  }, [user?.address]);

  const handleSubmit = (values: ProfileAddressRequest, { setSubmitting }: FormikHelpers<ProfileAddressRequest>) => {
    dispatch(editProfileAddress(values)).then().finally(() => {
      setSubmitting(false);
      handleClose();
    });
  };

  return (
    <Formik
      initialValues={{ ...initValues }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={profileAddressValidate}
    >
      {({ values, dirty, setValues, setFieldValue, isSubmitting }) => {
        const handleSetDefault = (index: number) => {
          const newValue: Array<Address> = values.address.map((item, i) => ({ ...item, isDefault: i === index }));
          setFieldValue('address', newValue).then();
        };

        return (
          <Form>
            <FieldArray
              name='address'
              render={(arrayHelpers) => (
                <Grid container spacing={2}>
                  {values.address?.map((_, i) => (
                    <React.Fragment key={i}>
                      <Grid item xs={12}>
                        <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                          <Stack flexDirection='row' justifyContent='flex-start' alignItems='center' gap={2}>
                            <p style={{ fontSize: '14px', fontWeight: 600 }}>Địa chỉ {i + 1}:</p>
                            {_.isDefault ? (
                              <CheckCircleRoundedIcon fontSize='small' color='primary' />
                            ) : (
                              <ButtonCustom
                                variant='text'
                                content='Chọn làm mặc định'
                                handleClick={() => handleSetDefault(i)}
                              />
                            )}
                          </Stack>
                          <IconButton onClick={() => arrayHelpers.remove(i)}>
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                        </Stack>
                      </Grid>
                      <Grid item md={3}>
                        <AutocompleteCustom
                          name={`address[${i}].provinceLevel`}
                          isNotCheckbox
                          label='Tỉnh / thành'
                          options={provinces}
                          displayLabel='province_name'
                          displaySelected='province_id'
                          handleChange={async (value) => {
                            let newDistrict: Array<District>;
                            // @ts-ignore
                            if (value?.province_id) {
                              // @ts-ignore
                              newDistrict = await ProfileAddressRequest.loadDistricts(String(value?.province_id));
                            }
                            setValues(prev => {
                              const newValue = { ...prev };

                              newValue.address[i].provinceLevel = value;
                              newValue.address[i].districtLevel = null;
                              newValue.address[i].wardLevel = null;
                              newValue.address[i].listWard = new Array<Ward>();
                              newValue.address[i].listDistrict = newDistrict;

                              return newValue;
                            });
                          }}
                        />
                      </Grid>
                      <Grid item md={3}>
                        <AutocompleteCustom
                          name={`address[${i}].districtLevel`}
                          label='Quận / huyện'
                          isNotCheckbox
                          options={values.address[i].listDistrict as Array<District>}
                          displayLabel='district_name'
                          displaySelected='district_id'
                          handleChange={async (value) => {
                            let newWard: Array<Ward>;
                            // @ts-ignore
                            if (value?.district_id) {
                              // @ts-ignore
                              newWard = await ProfileAddressRequest.loadWards(String(value.district_id));
                            }
                            setValues(prev => {
                              const newValue = { ...prev };

                              newValue.address[i].districtLevel = value;
                              newValue.address[i].wardLevel = null;
                              newValue.address[i].listWard = newWard;

                              return newValue;
                            });
                          }}
                        />
                      </Grid>
                      <Grid item md={3}>
                        <AutocompleteCustom
                          name={`address[${i}].wardLevel`}
                          label='Xã / phường'
                          isNotCheckbox
                          options={values.address[i]?.listWard as Array<Ward>}
                          displayLabel='ward_name'
                          displaySelected='ward_code'
                        />
                      </Grid>

                      <Grid item md={3}>
                        <TextFieldCustom
                          name={`address[${i}].addressName`}
                          label='Địa chỉ'
                          placeholder='Nhà, công ty,...'
                        />
                      </Grid>
                      <Grid item md={3}>
                        <TextFieldCustom name={`address[${i}].customerName`} label='Tên khách hàng' />
                      </Grid>
                      <Grid item md={3}>
                        <TextFieldCustom name={`address[${i}].phoneNumbers`} label='Số điện thoại' type='number' />
                      </Grid>
                      <Grid item md={6}>
                        <TextFieldCustom
                          name={`address[${i}].detail`}
                          label='Địa chỉ cụ thể'
                          isTextArea
                          minRowArea={1}
                          maxRowArea={3}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}

                  {/*{values.address.length <= 2 && (*/}
                  <Grid item md={12} mt={2}>
                    <ButtonCustom
                      variant='outlined'
                      content='Thêm địa chỉ'
                      startIcon={<AddBoxRoundedIcon />}
                      handleClick={() => arrayHelpers.push(new Address())}
                    />
                  </Grid>
                  {/*)}*/}
                </Grid>
              )}
            />

            <Stack direction='row' justifyContent='flex-end' gap={1} mt={2}>
              <ButtonCustom
                content='Hủy bỏ'
                variant='outlined'
                handleClick={handleClose}
              />
              <ButtonCustom
                content='Lưu địa chỉ'
                variant='contained'
                type='submit'
                disabled={!dirty || isSubmitting}
              />
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
});