import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { ButtonCustom, LoadingSection } from '@components/Common';
import { ProductModel } from '@models/Product';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/store';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useRouter } from 'next/navigation';
import { editProduct, getDetailsProduct } from '@store/slices/productSlice';
import { tabsProduct } from './ProductCreate';
import { enqueueSnackbar } from 'notistack';
import { RootRoutes } from '@constants/enum';

export const ProductEdit = ({ id }: { id: string }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { product, isLoadingDetails } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailsProduct(id));
  }, [id]);

  const handleSubmit = async (
    values: ProductModel,
    { setSubmitting }: FormikHelpers<ProductModel>,
  ) => {
    try {
      // Just submit field changed when edit
      
      // const changedFields: Partial<ProductModel> = {};
      // for (const key in values) {
      //   if ((values as any)[key] !== (product as any)[key]) {
      //     (changedFields as any)[key] = (values as any)[key];
      //   }
      // }

      const response = await dispatch(editProduct(values, String(values._id)));

      if (response?.success) {
        enqueueSnackbar('Chỉnh sửa sản phẩm thành công!', {
          variant: 'success',
        });
        router.push(RootRoutes.PRODUCT_ROUTE);
      } else {
        enqueueSnackbar('Có lỗi xảy ra, Chỉnh sửa thất bại!', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra, chỉnh sửa thất bại!', {
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return isLoadingDetails ? (
    <LoadingSection isLoading={isLoadingDetails} />
  ) : (
    <Box component="div" sx={{ bgcolor: '#fff', borderRadius: '8px', padding: '15px 25px' }}>
      <Formik enableReinitialize initialValues={product as ProductModel} onSubmit={handleSubmit}>
        {({ isSubmitting, dirty }) => {
          return (
            <Form>
              <Stack width="100%" flexDirection="column" alignItems="flex-start">
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Typography
                    variant="h5"
                    fontSize="1.2rem"
                    fontWeight="600"
                    color={theme.color.black}
                  >
                    Chỉnh sửa sản phẩm
                  </Typography>
                </Stack>

                <Tabs
                  value={tabIndex}
                  onChange={(event: React.SyntheticEvent, index: number) => setTabIndex(index)}
                  aria-label="tabs create product"
                  sx={{
                    mt: 1,
                    '& .MuiTabs-indicator': {
                      backgroundColor: theme.color.red,
                    },
                  }}
                >
                  {tabsProduct.map((tab, index) => (
                    <Tab
                      key={tab.name}
                      label={tab.name}
                      onClick={() => setTabIndex(index)}
                      sx={{
                        textTransform: 'capitalize',
                        '&.Mui-selected': {
                          fontWeight: 700,
                          color: theme.color.red,
                        },
                      }}
                    />
                  ))}
                </Tabs>

                {tabsProduct[tabIndex].component}

                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  width="100%"
                  gap="15px"
                  mt={2}
                >
                  <ButtonCustom
                    variant="text"
                    handleClick={() => router.back()}
                    content="Quay lại"
                    startIcon={<KeyboardBackspaceRoundedIcon />}
                  />
                  <ButtonCustom
                    variant="contained"
                    type="submit"
                    disabled={!dirty || isSubmitting}
                    content="Lưu"
                  />
                </Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
