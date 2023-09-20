import React from 'react';
import { ButtonCustom, ShowDialog } from '@components/Common';
import { FieldArray, useFormikContext } from 'formik';
import { IconButton, Grid, TextField, Box, Stack } from '@mui/material';
import { ProductModel, ProductRequest } from '@models/Product';
import { AttributeDynamics } from '@models/Attribute';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { TextFieldCustom } from '@components/Common/FormGroup/TextFieldCustom';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  index: number;
}

export const AttributeDialog = (props: Props) => {
  const { values } = useFormikContext<ProductRequest | ProductModel>();
  const { isOpen, handleClose, index } = props;

  return (
    <ShowDialog
      dialogTitle="Thuộc tính biến thể"
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ minWidth: 700 }}
    >
      <Box sx={{ width: '100%', mt: '15px' }}>
        <FieldArray
          name={`variations[${index}].attributes`}
          render={(arrayHelpers) => (
            <>
              <Grid container spacing={2} columns={20}>
                {values.variations[index].attributes?.map((_, i) => (
                  <React.Fragment key={i}>
                    <Grid item lg={6}>
                      <TextFieldCustom
                        name={`variations[${index}].attributes[${i}].k`}
                        label="Thuộc tính"
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextFieldCustom
                        name={`variations[${index}].attributes[${i}].v`}
                        label="Giá trị"
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextFieldCustom
                        name={`variations[${index}].attributes[${i}].u`}
                        label="Đơn vị"
                      />
                    </Grid>
                    <Grid item lg={2} sx={{ textAlign: 'center' }}>
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
                styles={{ marginTop: '20px' }}
              />

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
                <ButtonCustom variant="outlined" handleClick={handleClose} content="Đóng" />
              </Stack>
            </>
          )}
        />
      </Box>
    </ShowDialog>
  );
};
