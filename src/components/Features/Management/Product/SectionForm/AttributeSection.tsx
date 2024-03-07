import React, { memo } from 'react';
import { ProductModel, ProductRequest } from '@models/Product';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormikContext } from 'formik';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { TextFieldCustom } from '@components/Common';

export const AttributeSection = memo(() => {
  const { values } = useFormikContext<ProductRequest | ProductModel>();
  const theme = useTheme();

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
    </>
  );
});
