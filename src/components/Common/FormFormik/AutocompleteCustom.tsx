'use client';

import React, { memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  FastField,
  FastFieldAttributes,
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
  FormikValues,
  getIn,
} from 'formik';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type SelectValue<T> = T | T[] | null;

interface Props<T> {
  name: string;
  options: T[];
  displayLabel?: string;
  displaySelected?: string;
  label?: string | React.JSX.Element;
  searchValue?: string;
  handleChangeSearchValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlurSearchValue?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  limit?: number;
  isLoading?: boolean;
  multiple?: boolean;
  placeholder?: string;
  handleChange?: (value: SelectValue<T>, event: React.SyntheticEvent<Element, Event>) => void;
  isNotCheckbox?: boolean;
  handleBlur?: React.FocusEventHandler<HTMLDivElement>;
}

interface MultiSelectProps<T> extends Props<T> {
  field: FieldInputProps<T | T[]>;
  meta: FieldMetaProps<T | T[]>;
  setFieldValue: (name: string, value: SelectValue<T>) => void;
}

function AutocompleteComponent<T>(props: Readonly<MultiSelectProps<T>>) {
  const {
    name,
    disabled,
    options,
    label,
    field,
    meta,
    isLoading,
    multiple,
    displayLabel = 'name',
    displaySelected = 'id',
    limit = 10,
    placeholder,
    handleChange,
    setFieldValue,
    searchValue = '',
    handleChangeSearchValue,
    handleBlurSearchValue,
    isNotCheckbox = false,
    handleBlur,
  } = props;

  const getDefaultOptionLabel = (option: T) => getIn(option, displayLabel) ?? '';

  const defaultHandleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: SelectValue<T>,
  ) => {
    if (!value) {
      value = null;
    }

    if (handleChange) {
      handleChange(value, event);
    } else {
      setFieldValue(name, value);
    }
  };

  return (
    <Autocomplete
      {...field}
      value={field?.value ?? (multiple ? [] : null)}
      multiple={multiple}
      id={name}
      loading={isLoading}
      limitTags={limit}
      disabled={disabled}
      options={options ?? []}
      isOptionEqualToValue={(option, value) =>
        getIn(option, displaySelected) === getIn(value, displaySelected)
      }
      onBlur={handleBlur}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            {!isNotCheckbox && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 5 }}
                checked={selected}
              />
            )}
            {getIn(option, displayLabel)}
          </li>
        );
      }}
      disableCloseOnSelect={!!multiple}
      getOptionLabel={getDefaultOptionLabel}
      onChange={defaultHandleChange}
      // noOptionsText="Không có dữ liệu"
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{
            htmlFor: name,
            shrink: true,
          }}
          value={searchValue}
          onChange={handleChangeSearchValue}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={15} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          onBlur={handleBlurSearchValue}
          placeholder={placeholder}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
        />
      )}
    />
  );
}

const shouldComponentUpdate = (
  nextProps: FastFieldAttributes<Props<any> & { formik: FormikValues }>,
  currentProps: FastFieldAttributes<Props<any> & { formik: FormikValues }>,
) =>
  nextProps?.options !== currentProps?.options ||
  nextProps?.value !== currentProps?.value ||
  nextProps?.handleChange !== currentProps?.handleChange ||
  nextProps?.disabled !== currentProps?.disabled ||
  Object.keys(nextProps).length !== Object.keys(currentProps).length ||
  getIn(nextProps.formik.values, currentProps.name) !==
    getIn(currentProps.formik.values, currentProps.name) ||
  getIn(nextProps.formik.errors, currentProps.name) !==
    getIn(currentProps.formik.errors, currentProps.name) ||
  getIn(nextProps.formik.touched, currentProps.name) !==
    getIn(currentProps.formik.touched, currentProps.name);

function AutocompleteCustom<T = any>(props: Readonly<Props<T>>) {
  return (
    <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
      {({
        field,
        meta,
        form,
      }: {
        field: FieldInputProps<T | T[]>;
        meta: FieldMetaProps<T | T[]>;
        form: FormikProps<T | T[]>;
      }) => (
        <AutocompleteComponent<T>
          {...props}
          field={field}
          meta={meta}
          setFieldValue={form.setFieldValue}
        />
      )}
    </FastField>
  );
}

const MemoizedMultiSelectCustom = memo(AutocompleteCustom) as <T = any>(
  props: Props<T>,
) => React.JSX.Element;

export { MemoizedMultiSelectCustom as AutocompleteCustom };
