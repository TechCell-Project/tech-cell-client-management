import React, { useEffect, useState } from 'react';
import { ShowDialog, ButtonCustom, AutocompleteCustom, TextFieldCustom } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Formik, Form, FormikHelpers } from 'formik';
import { CategoryModel } from '@models/Category';
import { createOrEditValidate } from '@validate/category.validate';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { getAllAttributes } from '@store/slices/attributeSlice';
import { AttributeModel, PagingAttribute } from '@models/Attribute';
import { Paging } from '@models/Common';
import { createNewCategory, getAllCategory } from '@store/slices/categorySlice';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

export const CreateCategory = (props: DialogAction) => {
  const dispatch = useAppDispatch();
  const { attributes, isLoading } = useAppSelector((state) => state.attribute);
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
    { resetForm, setSubmitting }: FormikHelpers<CategoryModel>,
  ) => {
    const listAttribute = values.requireAttributes?.map((item) => item.label);

    try {
      const response = await dispatch(
        createNewCategory({ ...values, requireAttributes: listAttribute }),
      );

      if (response?.success) {
        toast.success('Thêm mới thuộc tính thành công!');
        resetForm();
        await dispatch(getAllCategory(new Paging()));
        props.handleClose();
      } else {
        toast.error('Có lỗi xảy ra, Thêm mới thất bại!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, Thêm mới thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Thêm mới thể loại"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 560 }}
    >
      <Formik
        enableReinitialize
        initialValues={new CategoryModel()}
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
            <>
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
                  content="Thêm"
                />
              </Stack>
            </>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
