import React, { useState, memo } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { ImageModel, ProductModel, ProductRequest, VariationModel } from '@models/Product';
import { ButtonCustom, SelectCustom } from '@components/Common';
import { STATUS_PRODUCT_OPTIONS } from '@constants/options';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { AttributeDialog } from '../Dialog/AttributeDialog';
import { ImageDialog } from '../Dialog/ImageDialog';
import { FieldImageProps } from '@models/Image';
import { getCountImage } from '@utils/index';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { DeleteVariationDialog } from '@components/Form/Management/Product/Dialog/DeleteVariationDialog';

export const VariantSection = memo(() => {
  const theme = useTheme();
  const { values, handleChange, setFieldValue } = useFormikContext<ProductRequest | ProductModel>();

  const [currentVariation, setCurrentVariation] = useState<VariationModel>(new VariationModel());
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [indexVariation, setIndexVariation] = useState<number | null>(null);
  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(null);

  const handleSetVariationIndex = (index: number) => {
    setIndexVariation(index);
    setOpenAttribute(true);
  };

  return (
    <>
      <Stack flexDirection='row' justifyContent='flex-start' alignItems='center' gap={1}>
        <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />
        <Typography variant='body1' fontWeight={600} fontSize='13px'>
          Mỗi biến thể bao gồm: số lượng, giá, ảnh, thuộc tính (Dung lượng, màu sắc,...)
        </Typography>
      </Stack>
      <FieldArray
        name='variations'
        render={(arrayHelpers) => (
          <>
            <Grid container spacing={2} columns={20}>
              {values?.variations?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <Grid item lg={6}>
                      <Stack flexDirection='row' gap={2} alignItems='center'>
                        <p>3.{i + 1}</p>
                        <TextFieldCustom
                          name={`variations[${i}].stock`}
                          label='Số lượng'
                          type='number'
                          handleChange={({ target }) => setFieldValue(target.name, +target.value)}
                        />
                      </Stack>
                    </Grid>
                    <Grid item lg={6}>
                      <SelectCustom
                        name={`variations[${i}].status`}
                        options={STATUS_PRODUCT_OPTIONS}
                        onChange={handleChange}
                        content='Trạng thái'
                        value={item.status}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextFieldCustom
                        name={`variations[${i}].price.base`}
                        label='Giá gốc'
                        type='numeric'
                      />
                    </Grid>
                    <Grid item lg={2} sx={{ textAlign: 'center' }}>
                      <IconButton onClick={() => {
                        if ((values as ProductModel)?._id && Boolean(item.sku)) {
                          setOpenConfirm(true);
                          setCurrentVariation(item);
                        } else {
                          arrayHelpers.remove(i);
                        }
                      }}>
                        <RemoveCircleRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item lg={5}>
                      <TextFieldCustom
                        name={`variations[${i}].price.sale`}
                        label='Đơn giá'
                        type='numeric'
                      />
                    </Grid>
                    <Grid item lg={5}>
                      <TextFieldCustom
                        name={`variations[${i}].price.special`}
                        label='Giá khuyến mãi'
                        type='numeric'
                      />
                    </Grid>
                    <Grid item lg={10} sx={{ mb: 2 }}>
                      <ButtonCustom
                        variant='text'
                        content='Thuộc tính'
                        handleClick={() => handleSetVariationIndex(i)}
                        isBadge
                        badgeCount={item.attributes?.length ?? 0}
                      />
                      <ButtonCustom
                        variant='text'
                        content='Ảnh chính'
                        endIcon={<PhotoRoundedIcon />}
                        styles={{ marginLeft: 5 }}
                        isBadge
                        badgeCount={getCountImage(item.images as ImageModel[], true)}
                        handleClick={() =>
                          setFieldNameImage({
                            field: `variations`,
                            index: i,
                            isThumbnail: true,
                          })
                        }
                      />
                      <ButtonCustom
                        variant='text'
                        content='Ảnh phụ'
                        endIcon={<CollectionsRoundedIcon />}
                        styles={{ marginLeft: 5 }}
                        isBadge
                        badgeCount={getCountImage(item.images as ImageModel[])}
                        handleClick={() =>
                          setFieldNameImage({
                            field: `variations`,
                            index: i,
                            isThumbnail: false,
                          })
                        }
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>

            <ButtonCustom
              variant='outlined'
              content='Thêm biến thể'
              startIcon={<AddBoxRoundedIcon />}
              handleClick={() => arrayHelpers.push(new VariationModel())}
            />

            {openAttribute && (
              <AttributeDialog
                isOpen={openAttribute}
                handleClose={() => setOpenAttribute(false)}
                index={Number(indexVariation)}
              />
            )}

            {Boolean(fieldNameImage) && (
              <ImageDialog
                isOpen={Boolean(fieldNameImage)}
                handleClose={() => setFieldNameImage(null)}
                fieldImage={fieldNameImage as FieldImageProps}
              />
            )}

            {openConfirm && Boolean(currentVariation) && (
              <DeleteVariationDialog
                isOpen={openConfirm}
                handleClose={() => setOpenConfirm(false)}
                data={currentVariation}
              />
            )}
          </>
        )}
      />
    </>
  );
});
