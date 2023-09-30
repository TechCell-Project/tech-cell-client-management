import React, { useEffect } from 'react';
import { ButtonCustom, SelectInputCustom, ShowDialog } from '@components/Common';
import { FieldArray, useFormikContext } from 'formik';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ProductModel, ProductRequest } from '@models/Product';
import { AttributeDynamics, PagingAttribute } from '@models/Attribute';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllAttributes } from '@store/slices/attributeSlice';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  index: number;
}

export const AttributeDialog = (props: Props) => {
  const { values } = useFormikContext<ProductRequest | ProductModel>();
  const { isOpen, handleClose, index } = props;
  // const [listAttributes, setListAttributes] = useState<AttributeModel>()

  const dispatch = useAppDispatch();
  const { attributes, isLoading } = useAppSelector((state) => state.attribute);

  useEffect(() => {
    dispatch(getAllAttributes({
      ...new PagingAttribute(),
      pageSize: 50,
    })).then();
  }, [dispatch]);

  // @ts-ignore
  return (
    <ShowDialog
      dialogTitle='Thuộc tính biến thể'
      handleClose={handleClose}
      isOpen={isOpen}
      dialogStyle={{ minWidth: 800 }}
    >
      <Box sx={{ width: '100%', mt: '15px' }}>
        <FieldArray
          name={`variations[${index}].attributes`}
          render={(arrayHelpers) => (
            <>
              <Grid container spacing={2} columns={20}>
                {values.variations[index].attributes?.map(
                  (_, i) => (
                    <React.Fragment key={i}>
                      <Grid item lg={6}>
                        <SelectInputCustom
                          name={`variations[${index}].attributes[${i}].k`}
                          options={attributes.data}
                          displayValue='label'
                          label='Thuộc tính'
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextFieldCustom
                          name={`variations[${index}].attributes[${i}].v`}
                          label='Giá trị'
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <TextFieldCustom
                          name={`variations[${index}].attributes[${i}].u`}
                          label='Đơn vị'
                        />
                      </Grid>
                      <Grid item lg={2} sx={{ textAlign: 'center' }}>
                        <IconButton onClick={() => arrayHelpers.remove(i)}>
                          <RemoveCircleRoundedIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ),
                )}
              </Grid>

              <ButtonCustom
                variant='outlined'
                content='Thêm thuộc tính'
                startIcon={<AddBoxRoundedIcon />}
                handleClick={() => arrayHelpers.push(new AttributeDynamics())}
                styles={{ marginTop: '20px' }}
              />

              <Stack direction='row' justifyContent='flex-end' sx={{ mt: 4 }}>
                <ButtonCustom variant='outlined' handleClick={handleClose} content='Đóng' />
              </Stack>
            </>
          )}
        />
      </Box>
    </ShowDialog>
  );
};
