"use client";

import React, { memo } from "react";
import {
  Checkbox,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FastField, FieldInputProps, FieldMetaProps, getIn } from "formik";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props<T> {
  name: string;
  options: T[];
  displayLabel?: string;
  displaySelected?: string;
  label?: string | JSX.Element;
  disabled?: boolean;
  limit?: number;
  isLoading?: boolean;
  multiple?: boolean;
  placeholder?: string;
  handleChange?: (
    value: T | T[] | null,
    event: React.SyntheticEvent<Element, Event>
  ) => void;
}

interface MultiSelectProps<T> extends Props<T> {
  field: FieldInputProps<T | T[]>;
  meta: FieldMetaProps<T | T[]>;
  setFieldValue: (name: string, value: T | T[] | null) => void;
}

function AutoCompleteComponent<T>(props: MultiSelectProps<T>) {
  const {
    name,
    disabled,
    options,
    label,
    field,
    meta,
    isLoading,
    multiple,
    displayLabel = "name",
    displaySelected = "id",
    limit = 10,
    placeholder,
    handleChange,
    setFieldValue,
  } = props;

  const getDefaultOptionLabel = (option: T) =>
    getIn(option, displayLabel) ?? "";

  const defaultHandleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: T | T[] | null
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
      options={options || []}
      isOptionEqualToValue={(option, value) =>
        getIn(option, displaySelected) === getIn(value, displaySelected)
      }
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 5 }}
              checked={selected}
            />
            {getIn(option, displayLabel)}
          </li>
        );
      }}
      disableCloseOnSelect
      getOptionLabel={getDefaultOptionLabel}
      onChange={defaultHandleChange}
      noOptionsText="Không có dữ liệu"
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{
            htmlFor: name,
            shrink: true,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={15} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          placeholder={placeholder}
          error={Boolean(meta && meta.touched && meta.error)}
          helperText={meta && meta.touched && meta.error ? meta.error : ""}
        />
      )}
    />
  );
}

const shouldComponentUpdate = (nextProps: any, currentProps: any) =>
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

function MultiSelectCustom<T = any>(props: Props<T>) {
  return (
    <FastField
      {...props}
      name={props.name}
      shouldUpdate={shouldComponentUpdate}
    >
      {({
        field,
        meta,
        form,
      }: {
        field: FieldInputProps<T | T[]>;
        meta: FieldMetaProps<T | T[]>;
        form: any;
      }) => (
        <AutoCompleteComponent<T>
          {...props}
          field={field}
          meta={meta}
          setFieldValue={form.setFieldValue}
        />
      )}
    </FastField>
  );
}

const MemoizedMultiSelectCustom = memo(MultiSelectCustom) as <T = any>(
  props: Props<T>
) => JSX.Element;

export { MemoizedMultiSelectCustom as MultiSelectCustom };
