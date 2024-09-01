import React from "react";
import { useField } from "formik";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectProps,
  FormHelperText,
} from "@mui/material";

type Option = {
  value: string;
  label: string;
  otherValue?: {
    [key: string]: any;
  };
};

type FormikSelectProps = {
  name: string;
  label: string;
  options: Option[];
  otherOnChange?: (option: Option) => void;
} & SelectProps;

const FormikSelect: React.FC<FormikSelectProps> = ({
  name,
  label,
  options,
  otherOnChange,
  ...props
}) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <FormControl fullWidth variant={props.variant} error={!!errorText}>
      <InputLabel>{label + ` ${props.placeholder ?? ""}`}</InputLabel>
      <Select
        {...field}
        {...props}
        label={label + ` ${props.placeholder ?? ""}`}
        value={field.value}
        onChange={(event) => field.onChange(event)}
        onBlur={field.onBlur}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              otherOnChange && otherOnChange(option);
            }}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSelect;
