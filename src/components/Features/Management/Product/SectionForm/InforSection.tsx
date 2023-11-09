import { AutocompleteCustom, ButtonCustom, SelectCustom } from '@components/Common';
import React, { useEffect, useState, memo, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { useFormikContext } from 'formik';
import { ImageModel, ProductModel, ProductRequest } from '@models/Product';
import { STATUS_PRODUCT_OPTIONS } from '@constants/options';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllCategory } from '@store/slices/categorySlice';
import { CategoryModel } from '@models/Category';
import { ImageDialog } from '../Dialog/ImageDialog';
import { FieldImageProps } from '@models/Image';
import { formatDateViVN, getCountImage } from '@utils/index';
import { getCategoryByLabel } from '@services/categoryService';
import { AttributeDynamics, AttributeModel } from '@models/Attribute';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { Paging } from '@models/Common';

export const InforSection = memo(() => {
  const { handleChange, setFieldValue, values, touched, errors } = useFormikContext<
    ProductRequest | ProductModel
  >();

  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(null);
  const [isFetchCategory, setIsFetchCategory] = useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<Paging>(new Paging());

  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    timeoutId = setTimeout(() => {
      dispatch(getAllCategory(searchCategory)).then();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchCategory, dispatch]);

  const handleChangeCategory = useCallback(
    (payload: CategoryModel) => {
      if (payload?.label) {
        setIsFetchCategory(true);
        setFieldValue('generalAttributes', new Array<AttributeDynamics>()).then();

        getCategoryByLabel(payload.label)
          .then(({ data }: { data: CategoryModel }) => {
            const attributes: AttributeModel[] = data.requireAttributes ?? [];

            const newGeneralAttributes: AttributeDynamics[] = attributes.map((attribute) => ({
              k: attribute.label,
              v: values.listTempAtt?.find((item) => item.k === attribute.label)?.v ?? null,
              u: values.listTempAtt?.find((item) => item.k === attribute.label)?.u ?? null,
              name: attribute.name,
            }));

            setFieldValue('generalAttributes', newGeneralAttributes).then();
          })
          .finally(() => setIsFetchCategory(false));
      } else {
        setFieldValue('generalAttributes', new Array<AttributeDynamics>()).then();
      }
    },
    [setIsFetchCategory, setFieldValue],
  );

  return (
    <>
      <Grid container spacing={2}>
        {(values as ProductModel)?._id && (
          <>
            <Grid item lg={4}>
              <TextFieldCustom name='_id' label='ID' readOnly />
            </Grid>
            <Grid item lg={4}>
              <TextFieldCustom
                name='readOnlyCreatedAt'
                label='Thời gian tạo'
                defaultValue={formatDateViVN(String((values as ProductModel).createdAt))}
                readOnly
              />
            </Grid>
            <Grid item lg={4}>
              <TextFieldCustom
                name='readOnlyUpdatedAt'
                label='Thời gian chỉnh sửa'
                defaultValue={formatDateViVN(String((values as ProductModel).updatedAt))}
                readOnly
              />
            </Grid>
          </>
        )}
        <Grid item lg={4}>
          <TextFieldCustom name='name' label='Tên sản phẩm' />
        </Grid>

        <Grid item lg={4}>
          <SelectCustom
            value={values?.status}
            name='status'
            options={STATUS_PRODUCT_OPTIONS}
            onChange={handleChange}
            content='Trạng thái'
            error={touched.status && Boolean(errors.status)}
            helperText={touched.status && errors.status}
          />
        </Grid>

        <Grid item lg={4}>
          <AutocompleteCustom<CategoryModel>
            name='category'
            label='Thể loại'
            options={!isLoading ? categories.data : new Array<CategoryModel>()}
            displayLabel='name'
            displaySelected='label'
            handleChange={(value) => {
              setFieldValue('category', value).then();
              if (values.generalAttributes && values.listTempAtt) {
                values.listTempAtt = values.generalAttributes;
              }
              handleChangeCategory(value as CategoryModel);
            }}
            searchValue={searchCategory.keyword}
            handleChangeSearchValue={({ target }) =>
              setSearchCategory((prev) => ({ ...prev, keyword: target.value }))
            }
            handleBlurSearchValue={() => {
              if (searchCategory.keyword) {
                setSearchCategory(new Paging());
              }
            }}
            isLoading={isLoading || isFetchCategory}
          />
        </Grid>

        <Grid item lg={7}>
          <ButtonCustom
            variant='outlined'
            content='Ảnh chính'
            endIcon={<PhotoRoundedIcon />}
            isBadge
            badgeCount={getCountImage(values?.generalImages as ImageModel[], true)}
            handleClick={() => setFieldNameImage({ field: 'generalImages', isThumbnail: true })}
          />
          <ButtonCustom
            variant='outlined'
            content='Ảnh phụ'
            endIcon={<CollectionsRoundedIcon />}
            isBadge
            badgeCount={getCountImage(values?.generalImages as ImageModel[])}
            styles={{ marginLeft: '30px' }}
            handleClick={() => setFieldNameImage({ field: 'generalImages', isThumbnail: false })}
          />
        </Grid>
      </Grid>

      {Boolean(fieldNameImage) && (
        <ImageDialog
          isOpen={Boolean(fieldNameImage)}
          handleClose={() => setFieldNameImage(null)}
          fieldImage={fieldNameImage as FieldImageProps}
        />
      )}
    </>
  );
});
