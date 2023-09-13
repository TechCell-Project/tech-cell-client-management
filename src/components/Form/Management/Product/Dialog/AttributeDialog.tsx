import React from "react";
import { ButtonCustom, ShowDialog } from "@components/Common";
import { FieldArray, useFormikContext } from "formik";
import { IconButton, Grid, TextField, Box, Stack } from "@mui/material";
import { ProductRequest } from "@models/Product";
import { AttributeDynamics } from "@models/Attribute";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  index: number;
}

export const AttributeDialog = (props: Props) => {
  const { values, handleChange } = useFormikContext<ProductRequest>();

  return (
    <ShowDialog
      dialogTitle="Thuộc tính biến thể"
      handleClose={props.handleClose} 
      isOpen={props.isOpen}
      dialogStyle={{ minWidth: 700 }}
    >
      <Box sx={{ width: "100%", mt: "15px" }}>
        <FieldArray
          name={`variations[${props.index}].attributes`}
          render={(arrayHelpers) => (
            <>
              <Grid container spacing={2} columns={20}>
                {values.variations[props.index].attributes?.map(
                  (item, i) => (
                    <React.Fragment key={i}>
                      <Grid item lg={6}>
                        <TextField
                          id={`variations[${props.index}].attributes[${i}].k`}
                          name={`variations[${props.index}].attributes[${i}].k`}
                          label="Thuộc tính"
                          fullWidth
                          value={item.k}
                          variant="outlined"
                          onChange={handleChange}
                          size="small"
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          id={`variations[${props.index}].attributes[${i}].v`}
                          name={`variations[${props.index}].attributes[${i}].v`}
                          label="Giá trị"
                          value={item.v}
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                          size="small"
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextField
                          id={`variations[${props.index}].attributes[${i}].u`}
                          name={`variations[${props.index}].attributes[${i}].u`}
                          label="Đơn vị"
                          value={item.u}
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
                  )
                )}
              </Grid>

              <ButtonCustom
                variant="outlined"
                content="Thêm thuộc tính"
                startIcon={<AddBoxRoundedIcon />}
                handleClick={() => arrayHelpers.push(new AttributeDynamics())}
                styles={{ marginTop: "20px" }}
              />

              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 4 }}
              >
                <ButtonCustom
                  variant="outlined"
                  handleClick={props.handleClose}
                  content="Đóng"
                />
              </Stack>
            </>
          )}
        />
      </Box>
    </ShowDialog>
  );
};
