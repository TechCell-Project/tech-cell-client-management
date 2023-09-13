import React, { useEffect } from "react";
import { ProductRequest } from "@models/Product";
import { Grid, useTheme, TextField, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { CategoryModel } from "@models/Category";
import { getCategoryByLabel } from "@services/categoryService";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const AttributeSection = () => {
  const { values, handleChange, setFieldValue, touched, errors } =
    useFormikContext<ProductRequest>();
  const theme = useTheme();

  useEffect(() => {
    const label = values.categories?.[0];
    if (label?.length >= 0) {
      values.generalAttributes = [];
    }
    if (label) {
      getCategoryByLabel(label).then(({ data }: { data: CategoryModel }) => {
        const attributes = data.requireAttributes ?? [];

        const newGeneralAttributes = attributes.map((attribute) => ({
          k: attribute.label,
          v: null,
          u: null,
        }));

        setFieldValue("generalAttributes", newGeneralAttributes);
      });
    }
  }, [values.categories]);

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
        <Typography variant="body1" fontWeight={600} fontSize="13px">
          Chọn thể loại mục "1." để hiển thị danh sách thuộc tính chung
        </Typography>
      </Stack>
      <Grid container spacing={2} columns={16}>
        {values?.generalAttributes?.map((item, i) => (
          <React.Fragment key={i}>
            <Grid item lg={1}>
              <Stack
                flexDirection="row"
                alignItems="center"
                height="100%"
                justifyContent="center"
              >
                <p>2.{i + 1}</p>
              </Stack>
            </Grid>
            <Grid item lg={5}>
              <TextField
                id={`generalAttributes[${i}].k`}
                name={`generalAttributes[${i}].k`}
                label="Thuộc tính"
                value={item.k}
                fullWidth
                variant="outlined"
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item lg={5}>
              <TextField
                id={`generalAttributes[${i}].v`}
                name={`generalAttributes[${i}].v`}
                label="Giá trị"
                value={item.v}
                fullWidth
                variant="outlined"
                onChange={({ target }) =>
                  setFieldValue(target.name, target.value)
                }
                size="small"
              />
            </Grid>
            <Grid item lg={5}>
              <TextField
                id={`generalAttributes[${i}].u`}
                name={`generalAttributes[${i}].u`}
                label="Đơn vị"
                value={item.u}
                fullWidth
                variant="outlined"
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};
