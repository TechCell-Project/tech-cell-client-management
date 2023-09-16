import { Box, Stack, Tabs, Tab, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { ProductRequest } from "@models/Product";
import { ButtonCustom } from "@components/Common";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { requestProductValidate } from "@validate/product.validate";
import { useAppDispatch } from "@store/store";
import { createNewProduct } from "@store/slices/productSlice";
import { enqueueSnackbar } from "notistack";
import { RootRoutes } from "@constants/enum";
import { DescTab, InfoBasicTab } from "../CreateTabs";

const tabsCreate = [
  { name: "Thông số", component: <InfoBasicTab /> },
  { name: "Mô tả", component: <DescTab /> },
];

export const ProductCreate = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleSubmit = async (
    values: ProductRequest,
    { resetForm, setSubmitting }: FormikHelpers<ProductRequest>
  ) => {
    try {
      const response = await dispatch(createNewProduct(values));

      if (response?.success) {
        enqueueSnackbar("Thêm mới sản phẩm thành công!", {
          variant: "success",
        });
        resetForm();
        router.push(RootRoutes.PRODUCT_ROUTE);
      } else {
        enqueueSnackbar("Có lỗi xảy ra, Thêm mới thất bại!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra, Thêm mới thất bại!", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="div"
      sx={{ bgcolor: "#fff", borderRadius: "8px", padding: "15px 25px" }}
    >
      <Formik
        enableReinitialize
        initialValues={new ProductRequest()}
        onSubmit={handleSubmit}
        // validationSchema={requestProductValidate}
      >
        {({ values, isSubmitting }) => {
          // console.log(values);
          return (
            <Form>
              <Stack
                width="100%"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Typography
                    variant="h5"
                    fontSize="1.2rem"
                    fontWeight="600"
                    color={theme.color.black}
                  >
                    Thêm mới sản phẩm
                  </Typography>
                </Stack>

                <Tabs
                  value={tabIndex}
                  onChange={(event: React.SyntheticEvent, index: number) =>
                    setTabIndex(index)
                  }
                  aria-label="tabs create product"
                  sx={{
                    mt: 1,
                    "& .MuiTabs-indicator": {
                      backgroundColor: theme.color.red,
                    },
                  }}
                >
                  {tabsCreate.map((tab, index) => (
                    <Tab
                      key={tab.name}
                      label={tab.name}
                      onClick={() => setTabIndex(index)}
                      sx={{
                        textTransform: "capitalize",
                        "&.Mui-selected": {
                          fontWeight: 700,
                          color: theme.color.red,
                        },
                      }}
                    />
                  ))}
                </Tabs>

                {tabsCreate[tabIndex].component}

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
                    disabled={isSubmitting}
                    content="Thêm mới"
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