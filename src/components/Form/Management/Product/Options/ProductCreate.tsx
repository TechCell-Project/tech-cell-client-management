import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { ProductDataRequest } from "@models/Product";
import { ButtonCustom } from "@components/Common";
import styles from "@styles/components/_common.module.scss";
import { AttributeSection, InforSection, VariantSection } from "../SectionForm";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { requestProductValidate } from "@validate/product.validate";
import { useAppDispatch } from "@store/store";
import { createNewProduct, getAllProduct } from "@store/slices/productSlice";
import { enqueueSnackbar } from "notistack";
import { Paging } from "@models/Common";
import { RootRoutes } from "@constants/enum";

export const ProductCreate = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: ProductDataRequest,
    { resetForm, setSubmitting }: FormikHelpers<ProductDataRequest>
  ) => {
    const listCategory = values.productData.categories?.map(
      (category) => category.label
    );
    values.productData.categories = listCategory;

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(key, item);
          }
        } else if (typeof value === "object") {
          formData.set(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const response = await dispatch(
        createNewProduct( formData )
      );

      if (response?.success) {
        enqueueSnackbar("Thêm mới sản phẩm thành công!", {
          variant: "success",
        });
        dispatch(getAllProduct(new Paging()));
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
        initialValues={new ProductDataRequest()}
        onSubmit={handleSubmit}
        validationSchema={requestProductValidate}
      >
        {({ values, isSubmitting }) => {
          console.log(values);
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

                <Stack
                  flexDirection="column"
                  alignItems="flex-start"
                  gap={3}
                  mt="20px"
                  width="100%"
                >
                  <Typography
                    fontSize="0.9rem"
                    fontWeight="500"
                    className={styles.titleHighlight}
                  >
                    1. <i>Thông tin cơ bản</i>
                  </Typography>
                  <InforSection />

                  <Typography
                    fontSize="0.9rem"
                    fontWeight="500"
                    className={styles.titleHighlight}
                  >
                    2. <i>Thuộc tính chung</i>
                  </Typography>
                  <AttributeSection />

                  <Typography
                    fontSize="0.9rem"
                    fontWeight="500"
                    className={styles.titleHighlight}
                  >
                    3. <i>Biến thể</i>
                  </Typography>
                  <VariantSection />
                </Stack>

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
