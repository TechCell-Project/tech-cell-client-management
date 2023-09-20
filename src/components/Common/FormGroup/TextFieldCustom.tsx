import React, { ChangeEvent, InputHTMLAttributes, memo, useState } from 'react';
import { TextField } from '@mui/material';
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
import { FormatNumeric } from '../Display/FormatNumeric';

interface Props {
  name: string;
  type?: 'text' | 'number' | 'numeric';
  label?: string | React.JSX.Element;
  notDelay?: boolean;
  disabled?: boolean;
  placeholder?: string;
  debounceTime?: number;
  isTextArea?: boolean;
  minRowArea?: number;
  maxRowArea?: number;
  className?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  defaultValue?: any;
  variant?: 'outlined' | 'filled' | 'standard';
}

interface TextFieldProps extends Props {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  setFieldValue: (name: string, value: string) => void;
}

const TextFieldComponent = (props: TextFieldProps) => {
  const {
    name,
    label,
    type = 'text',
    debounceTime = 400,
    variant = 'outlined',
    notDelay,
    field,
    meta,
    disabled,
    placeholder,
    isTextArea,
    minRowArea,
    maxRowArea,
    className = '',
    handleChange,
    readOnly,
    setFieldValue,
    defaultValue
  } = props;

  const [value, setValue] = useState<string>(field.value);
  const [t, setT] = useState<any>(undefined);

  const onChange =
    handleChange ||
    ((e: ChangeEvent<HTMLInputElement>) => {
      e?.persist?.();
      setValue(e.target.value);
      if (!notDelay) {
        if (t) {
          clearTimeout(t);
        }
        setT(setTimeout(() => setFieldValue(name, e.target.value ?? null), debounceTime));
      } else {
        setFieldValue(name, e.target.value ?? null);
      }
    });

  return (
    <TextField
      multiline={isTextArea}
      id={name}
      name={name}
      variant={variant}
      value={value}
      size="small"
      fullWidth
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      InputLabelProps={{
        htmlFor: name,
        shrink: true,
      }}
      minRows={minRowArea}
      maxRows={maxRowArea}
      InputProps={{
        readOnly: readOnly,
        inputComponent: type === 'numeric' ? (FormatNumeric as any) : 'input',
      }}
      className={className}
      defaultValue={defaultValue}
    />
  );
};

export const TextFieldCustom = memo((props: Props) => {
  return (
    <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
      {({ field, meta, form }: FastFieldProps<any> & { form: FormikProps<any> }) => (
        <TextFieldComponent
          {...props}
          field={field}
          meta={meta}
          setFieldValue={form.setFieldValue}
        />
      )}
    </FastField>
  );
});

const shouldComponentUpdate = (
  nextProps: FastFieldAttributes<Props & { formik: FormikValues }>,
  currentProps: FastFieldAttributes<Props & { formik: FormikValues }>,
) => {
  return (
    nextProps?.value !== currentProps?.value ||
    nextProps?.handleChange !== currentProps?.handleChange ||
    nextProps?.disabled !== currentProps?.disabled ||
    Object.keys(nextProps).length !== Object.keys(currentProps).length ||
    getIn(nextProps.formik.values, currentProps.name) !==
      getIn(currentProps.formik.values, currentProps.name) ||
    getIn(nextProps.formik.errors, currentProps.name) !==
      getIn(currentProps.formik.errors, currentProps.name) ||
    getIn(nextProps.formik.touched, currentProps.name) !==
      getIn(currentProps.formik.touched, currentProps.name)
  );
};
