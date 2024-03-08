import { ButtonCustom, ShowDialog, AutocompleteCustom, TextFieldCustom } from '@components/Common';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Formik, Form, FormikHelpers } from 'formik';
import { createOrEditValidate } from '@validate/category.validate';
import { useAppDispatch, useAppSelector } from '@store/store';
import { CategoryModel } from '@models/Category';
import { getAllAttributes } from '@store/slices/attributeSlice';
import { AttributeModel, PagingAttribute } from '@models/Attribute';
import { editCategory } from '@store/slices/categorySlice';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

export const EditCategory = (props: DialogAction) => {
  const { category } = useAppSelector((state) => state.category);
  const { attributes, isLoading } = useAppSelector((state) => state.attribute);
  const dispatch = useAppDispatch();
  const [searchAttribute, setSearchAttribute] = useState<PagingAttribute>(new PagingAttribute());

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    timeoutId = setTimeout(() => {
      dispatch(getAllAttributes({ ...searchAttribute, pageSize: 40 })).then();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchAttribute, dispatch]);

  const handleSubmit = async (
    values: CategoryModel,
    { setSubmitting }: FormikHelpers<CategoryModel>,
  ) => {
    const listAttributes = values.requireAttributes?.map((attribute) => attribute.label);

    try {
      const response = await dispatch(
        editCategory({ ...values, requireAttributes: listAttributes }, String(values._id)),
      );

      if (response?.success) {
        toast.success('Cập nhật thể loại thành công!');
        props.handleClose();
      } else {
        toast.error('Có lỗi xảy ra. Chỉnh sửa thất bại!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Chỉnh sửa thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Chỉnh sửa thể loại"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Formik
        enableReinitialize
        initialValues={category as CategoryModel}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              width: '100%',
              marginTop: '10px',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextFieldCustom name="name" label="Thể loại" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldCustom name="label" label="# Label" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom name="url" label="URL" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="description"
                  label="Mô tả"
                  isTextArea
                  minRowArea={1}
                  maxRowArea={3}
                />
              </Grid>
              <Grid item xs={12}>
                <AutocompleteCustom<AttributeModel>
                  options={attributes.data}
                  name="requireAttributes"
                  label="Thông số kỹ thuật"
                  displaySelected="name"
                  placeholder="Thông số"
                  multiple
                  searchValue={searchAttribute.keyword}
                  handleChangeSearchValue={({ target }) =>
                    setSearchAttribute((prev) => ({ ...prev, keyword: target.value }))
                  }
                  handleBlurSearchValue={() => {
                    if (searchAttribute.keyword) {
                      setSearchAttribute(new PagingAttribute());
                    }
                  }}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" gap={2} sx={{ mt: 4 }}>
              <ButtonCustom variant="outlined" handleClick={props.handleClose} content="Hủy bỏ" />
              <ButtonCustom
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                content="Xác nhận"
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
