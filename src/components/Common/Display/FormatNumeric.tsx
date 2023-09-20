import React from 'react';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const FormatNumeric = React.forwardRef<NumericFormatProps, Props>(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix=" ₫"
    />
  );
});
