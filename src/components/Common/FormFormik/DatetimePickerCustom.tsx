'use client';

import React, { memo, useEffect, useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  FastField,
  FastFieldAttributes,
  FastFieldProps,
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
  FormikValues,
  getIn,
} from 'formik';
import moment from 'moment';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
  handleChange?: (value: Date | string) => void;
}

interface DatetimeProps extends Props {
  field: FieldInputProps<Date | string>;
  meta: FieldMetaProps<Date | string>;
  setFieldValue: (name: string, value: Date | string) => void;
}

type DatetimeType = Date | string | null;

const DatetimePickerComponent = (props: DatetimeProps) => {
  const {
    meta,
    field,
    setFieldValue,
    name,
    maxDate,
    minDate,
    disabled,
    label,
    placeholder,
    format = 'dd/MM/yyyy',
    handleChange,
  } = props;

  const [value, setValue] = useState<DatetimeType>(field.value);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  const handleChangeNewDate = (date: DatetimeType) => {
    const newDate = date ? new Date(date).toISOString() : '';
    if (handleChange) {
      handleChange(newDate);
    } else {
      setFieldValue(name, newDate);
    }
  };

  const onChange = (newValue: DatetimeType) => {
    setValue(newValue);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!newValue) {
      handleChangeNewDate('');
    }

    if (newValue && moment(newValue, 'DD/MM/YYYY', true).isValid()) {
      // @ts-ignore
      setTimeoutId(setTimeout(() => handleChangeNewDate(newValue), 300));
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...field}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        inputFormat={format}
        onChange={onChange}
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            size="small"
            label={label}
            placeholder={placeholder}
            InputLabelProps={{
              htmlFor: name,
              shrink: true,
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : ''}
          />
        )}
      />
    </LocalizationProvider>
  );
};

const shouldComponentUpdate = (
  nextProps: FastFieldAttributes<Props & { formik: FormikValues }>,
  currentProps: FastFieldAttributes<Props & { formik: FormikValues }>,
) => {
  return (
    nextProps?.value !== currentProps?.value ||
    nextProps?.handleChange !== currentProps?.handleChange ||
    nextProps?.disabled !== currentProps?.disabled ||
    nextProps?.minDate !== currentProps?.minDate ||
    nextProps?.maxDate !== currentProps?.maxDate ||
    Object.keys(nextProps).length !== Object.keys(currentProps).length ||
    getIn(nextProps.formik.values, currentProps.name) !==
      getIn(currentProps.formik.values, currentProps.name) ||
    getIn(nextProps.formik.errors, currentProps.name) !==
      getIn(currentProps.formik.errors, currentProps.name) ||
    getIn(nextProps.formik.touched, currentProps.name) !==
      getIn(currentProps.formik.touched, currentProps.name)
  );
};

export const DatetimePickerCustom = memo((props: Props) => {
  return (
    <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
      {({ field, meta, form }: FastFieldProps & { form: FormikProps<any> }) => (
        <DatetimePickerComponent
          {...props}
          field={field}
          meta={meta}
          setFieldValue={form.setFieldValue}
        />
      )}
    </FastField>
  );
});
