import { AutocompleteCustom, ButtonCustom, SelectCustom } from '@components/Common';
import React, { useEffect, useState, memo } from 'react';
import { Grid } from '@mui/material';
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
import { TextFieldCustom } from '@components/Common/FormGroup/TextFieldCustom';
import { Paging } from '@models/Common';
import { debounce } from 'lodash';

export const InforSection = memo(() => {
  const { handleChange, setFieldValue, values, touched, errors } = useFormikContext<
    ProductRequest | ProductModel
  >();

  const [fieldNameImage, setFieldNameImage] = useState<FieldImageProps | null>(null);
  const [isFetchCategory, setIsFetchCategory] = useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<Paging>(new Paging());

  const dispatch = useAppDispatch();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const debouncedCategory = debounce((searchQuery: Paging) => {
    dispatch(getAllCategory(searchQuery));
  }, 400);

  useEffect(() => {
    debouncedCategory(searchCategory);
  }, [searchCategory]);

  const handleChangeCategory = (values: CategoryModel) => {
    if (values?.label) {
      setIsFetchCategory(true);
      setFieldValue('generalAttributes', new Array<AttributeDynamics>());
      getCategoryByLabel(values.label)
        .then(({ data }: { data: CategoryModel }) => {
          const attributes: AttributeModel[] = data.requireAttributes ?? [];

          const newGeneralAttributes: AttributeDynamics[] = attributes.map((attribute) => ({
            k: attribute.label,
            v: null,
            u: null,
            name: attribute.name,
          }));

          setFieldValue('generalAttributes', newGeneralAttributes);
        })
        .finally(() => setIsFetchCategory(false));
    } else {
      setFieldValue('generalAttributes', new Array<AttributeDynamics>());
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {(values as ProductModel)?._id && (
          <>
            <Grid item lg={4}>
              <TextFieldCustom name="_id" label="ID" readOnly />
            </Grid>
            <Grid item lg={4}>
              <TextFieldCustom
                name="readOnlyCreatedAt"
                label="Thời gian tạo"
                defaultValue={formatDateViVN(String((values as ProductModel).createdAt))}
                readOnly
              />
            </Grid>
            <Grid item lg={4}>
              <TextFieldCustom
                name="readOnlyUpdatedAt"
                label="Thời gian chỉnh sửa"
                defaultValue={formatDateViVN(String((values as ProductModel).updatedAt))}
                readOnly
              />
            </Grid>
          </>
        )}
        <Grid item lg={4}>
          <TextFieldCustom name="name" label="Tên sản phẩm" />
        </Grid>

        <Grid item lg={4}>
          <SelectCustom
            value={values?.status}
            name="status"
            options={STATUS_PRODUCT_OPTIONS}
            onChange={handleChange}
            content="Trạng thái"
            error={touched.status && Boolean(errors.status)}
            helperText={touched.status && errors.status}
          />
        </Grid>

        <Grid item lg={4}>
          <AutocompleteCustom<CategoryModel>
            name="category"
            label="Thể loại"
            options={categories.data}
            displayLabel="name"
            displaySelected="label"
            handleChange={(value) => {
              setFieldValue('category', value);
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
            variant="outlined"
            content="Ảnh chính"
            endIcon={<PhotoRoundedIcon />}
            isBadge
            badgeCount={getCountImage(values?.generalImages as ImageModel[], true)}
            handleClick={() => setFieldNameImage({ field: 'generalImages', isThumbnail: true })}
          />
          <ButtonCustom
            variant="outlined"
            content="Ảnh phụ"
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
