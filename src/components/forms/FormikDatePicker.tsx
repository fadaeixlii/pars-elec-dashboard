import React from "react";
import { useField } from "formik";
import { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type FormikDatePickerProps = { name: string; label: string } & TextFieldProps;

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  label,
  ...props
}) => {
  const [field, , helpers] = useField(props.name);

  return (
    <DatePicker
      {...field}
      label={label}
      value={field.value}
      onChange={(value) => helpers.setValue(value)}
    />
  );
};

export default FormikDatePicker;
