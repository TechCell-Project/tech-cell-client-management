'use client';

import React, { memo } from 'react';
import {
  FastField,
  FastFieldAttributes,
  FieldInputProps,
  FieldMetaProps, FormikProps,
  FormikValues,
  getIn,
} from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type DefaultOptionSelect<Value> = { name: string, value: Value }

interface Props<Value, Option> {
  name: string;
  options: Option[];
  displayValue?: keyof Option;
  displayLabel?: keyof Option;
  label?: string | React.JSX.Element;
  disabled?: boolean;
  required?: boolean;
  handleChange?: (value: Value, event: React.SyntheticEvent<Element, Event>) => void;
  isLoading?: boolean;
}

interface SelectInputCustomProps<Value = any, Option = DefaultOptionSelect<Value>> extends Props<Value, Option> {
  field: FieldInputProps<Value>;
  meta: FieldMetaProps<Value>;
  setFieldValue: (name: string, value: Value) => void;
}

function SelectComponent<Value, Option>(props: SelectInputCustomProps<Value, Option>) {
  const {
    name,
    disabled,
    options,
    label,
    field,
    meta,
    displayLabel = 'name',
    displayValue = 'value',
    handleChange,
    setFieldValue,
    isLoading,
  } = props;

  const getDefaultOptionLabel = (option: Option | Value): string => {
    if (option === field?.value) {
      // @ts-ignore
      return options?.find(e => e[displayValue] === option)?.[displayLabel] ?? '';
    }
    // @ts-ignore
    return option?.[displayLabel] || '';
  };

  // @ts-ignore
  return (
    <Autocomplete
      {...field}
      id={name}
      disabled={disabled}
      options={options || []}
      isOptionEqualToValue={(option, value) => {
        // @ts-ignore
        return option?.[displayValue] === value;
      }}
      size='small'
      getOptionLabel={getDefaultOptionLabel}
      onChange={(event, value) => {
        // @ts-ignore
        let newValue: Value = value?.[displayValue] ?? null as Value;

        if (handleChange) {
          handleChange(newValue, event);
        } else {
          setFieldValue(name, newValue);
        }
      }}
      loading={isLoading}
      noOptionsText='Không có dữ liệu'
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{
            htmlFor: name,
            shrink: true,
          }}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
        />
      )}
    />
  );
}

const shouldComponentUpdate = (
  nextProps: FastFieldAttributes<Props<any, any> & { formik: FormikValues }>,
  currentProps: FastFieldAttributes<Props<any, any> & { formik: FormikValues }>,
) => (
  !(nextProps?.options === currentProps?.options) ||
  nextProps?.value !== currentProps?.value ||
  nextProps?.handleChange !== currentProps?.handleChange ||
  nextProps?.disabled !== currentProps?.disabled ||
  Object.keys(nextProps).length !== Object.keys(currentProps).length ||
  getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name) ||
  getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name) ||
  getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)
);

function SelectInputCustom<Value, Option>(props: Props<Value, Option>) {
  return (
    <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
      {({ field, meta, form }: {
        field: FieldInputProps<Value>;
        meta: FieldMetaProps<Value>;
        form: FormikProps<Value>;
      }) => (
        <SelectComponent<Value, Option>
          {...props}
          field={field}
          meta={meta}
          setFieldValue={form.setFieldValue}
        />
      )}
    </FastField>
  );
}

const MemoizedSelectInputCustom = memo(SelectInputCustom) as <Value = any, Option = DefaultOptionSelect<Value>>(
  props: Props<Value, Option>,
) => React.JSX.Element;

export { MemoizedSelectInputCustom as SelectInputCustom };