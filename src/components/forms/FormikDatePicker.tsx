import React from "react";
import { useField } from "formik";
import { TextFieldProps } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

type FormikDatePickerProps = { name: string; label: string } & TextFieldProps;

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  label,
  ...props
}) => {
  const [, , helpers] = useField(props.name);

  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
      <DateTimePicker
        label={label}
        onChange={(value: any) => {
          console.log(value);
          console.log();
          helpers.setValue(new Date(value));
        }}
      />
    </LocalizationProvider>
  );
};

export default FormikDatePicker;
