import React, { memo, useEffect } from 'react';
import { ProductModel, ProductRequest, VariationModel } from '@models/Product';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FieldArray, useFormikContext } from 'formik';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { ButtonCustom, SelectInputCustom, TextFieldCustom } from '@components/Common';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { AttributeDynamics, PagingAttribute } from '@models/Attribute';
import IconButton from '@mui/material/IconButton';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllAttributes } from '@store/slices/attributeSlice';

export const AttributeSection = memo(() => {
  const { values } = useFormikContext<ProductRequest | ProductModel>();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const { attributes } = useAppSelector((state) => state.attribute);

  useEffect(() => {
    dispatch(
      getAllAttributes({
        ...new PagingAttribute(),
        pageSize: 100,
      }),
    ).then();
  }, [dispatch]);

  return (
    <>
      <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" gap={1}>
        <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
        <Typography variant="body1" fontWeight={600} fontSize="13px">
          Chọn thể loại mục "1." để hiển thị danh sách thuộc tính chung
        </Typography>
      </Stack>
      <Grid container spacing={2} columns={16}>
        {values?.generalAttributes?.map((attribute, i) => (
          <React.Fragment key={i}>
            <Grid item lg={1}>
              <Stack flexDirection="row" alignItems="center" height="100%" justifyContent="center">
                <p>2.{i + 1}</p>
              </Stack>
            </Grid>
            <Grid item lg={5}>
              <TextFieldCustom
                name={`generalAttributes[${i}].k`}
                label={`${attribute.name ?? 'Thuộc Tính'}`}
                readOnly
              />
            </Grid>
            <Grid item lg={5}>
              <TextFieldCustom name={`generalAttributes[${i}].v`} label="Giá trị" />
            </Grid>
            <Grid item lg={5}>
              <TextFieldCustom name={`generalAttributes[${i}].u`} label="Đơn vị" />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <FieldArray
        name="listAttributePlus"
        render={(arrayHelpers) => (
          <>
            <Grid container spacing={2} columns={16}>
              {values?.listAttributePlus?.map((attribute, i) => (
                <React.Fragment key={i}>
                  <Grid item lg={5}>
                    <SelectInputCustom
                      name={`listAttributePlus[${i}].k`}
                      options={attributes.data}
                      displayValue="label"
                      label="Thuộc tính"
                    />
                  </Grid>
                  <Grid item lg={5}>
                    <TextFieldCustom name={`listAttributePlus[${i}].v`} label="Giá trị" />
                  </Grid>
                  <Grid item lg={5}>
                    <TextFieldCustom name={`listAttributePlus[${i}].u`} label="Đơn vị" />
                  </Grid>
                  <Grid item lg={1} sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => arrayHelpers.remove(i)}>
                      <RemoveCircleRoundedIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>

            <ButtonCustom
              variant="outlined"
              content="Thêm thuộc tính"
              startIcon={<AddBoxRoundedIcon />}
              handleClick={() => arrayHelpers.push(new AttributeDynamics())}
            />
          </>
        )}
      />
    </>
  );
});
