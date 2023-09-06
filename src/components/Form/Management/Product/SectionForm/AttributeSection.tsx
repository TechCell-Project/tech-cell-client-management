import React from "react";
import { ButtonCustom } from "@components/Common";
import { ProductDataRequest } from "@models/Product";
import { Grid, IconButton, TextField, Stack } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import { AttributeDynamics } from "@models/Attribute";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export const AttributeSection = () => {
  const { values, handleChange, touched, errors } = useFormikContext<ProductDataRequest>();

  return (
    <FieldArray
      name="productData.generalAttributes"
      render={(arrayHelpers) => (
        <>
          <Grid container spacing={2} columns={20}>
            {values.productData.generalAttributes?.map((_, i) => (
              <React.Fragment key={i}>
                <Grid item lg={6}>
                  <Stack flexDirection="row" gap={2} alignItems="center">
                  <p>2.{i+1}</p>
                  <TextField
                    id={`productData.generalAttributes[${i}].k`}
                    name={`productData.generalAttributes[${i}].k`}
                    label="Thuộc tính"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                  />
                  </Stack>
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    id={`productData.generalAttributes[${i}].v`}
                    name={`productData.generalAttributes[${i}].v`}
                    label="Giá trị"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    id={`productData.generalAttributes[${i}].u`}
                    name={`productData.generalAttributes[${i}].u`}
                    label="Đơn vị"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item lg={2} sx={{ textAlign: "center" }}>
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
  );
};
