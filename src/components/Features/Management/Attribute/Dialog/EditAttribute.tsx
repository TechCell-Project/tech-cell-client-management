import React from 'react';
import { ButtonCustom, ShowDialog, TextFieldCustom } from '@components/Common';
import { AttributeModel, CreateAttributeModel } from '@models/Attribute';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@store/store';
import { createOrEditValidate } from '@validate/attribute.validate';
import { Form, Formik, FormikHelpers } from 'formik';
import { editAttribute } from '@store/slices/attributeSlice';
import { toast } from 'react-toastify';
import { DialogAction } from '@interface/common';

export const EditAttribute = (props: DialogAction) => {
  const { attribute } = useAppSelector((state) => state.attribute);
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: AttributeModel,
    { setSubmitting }: FormikHelpers<AttributeModel>,
  ) => {
    try {
      const { name, label, description, _id } = values;

      const payload = new CreateAttributeModel();
      payload.name = name;
      payload.label = label;
      payload.description = description;

      const response = await dispatch(editAttribute(payload, String(_id)));
      if (response?.success) {
        toast.success('Sửa thông số thành công!');
      } else {
        toast.error('Có lỗi xảy ra. Chỉnh sửa thất bại!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Chỉnh sửa thất bại!');
    } finally {
      props.handleClose();
      setSubmitting(false);
    }
  };

  return (
    <ShowDialog
      dialogTitle="Chỉnh sửa thông số"
      handleClose={props.handleClose}
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 420 }}
    >
      <Formik
        enableReinitialize
        initialValues={attribute as AttributeModel}
        validationSchema={createOrEditValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form
            style={{
              width: '100%',
              marginTop: '10px',
            }}
          >
            <Stack direction="column" gap={2} alignItems="center" justifyContent="center">
              <TextFieldCustom name="name" label="Tên thông số" />

              <TextFieldCustom name="label" label="# Label" />

              <TextFieldCustom
                name="description"
                label="Mô tả"
                isTextArea
                minRowArea={3}
                maxRowArea={4}
              />
            </Stack>

            <Stack direction="row" justifyContent="flex-end" gap={2} sx={{ mt: 4 }}>
              <ButtonCustom variant="outlined" handleClick={props.handleClose} content="Hủy bỏ" />
              <ButtonCustom
                variant="contained"
                type="submit"
                disabled={isSubmitting || !dirty}
                content="Xác nhận"
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </ShowDialog>
  );
};
