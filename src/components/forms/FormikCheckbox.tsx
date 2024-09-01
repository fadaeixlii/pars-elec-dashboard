import React from "react";
import { useField } from "formik";
import { Checkbox, FormControlLabel, CheckboxProps } from "@mui/material";

type FormikCheckboxProps = { name: string; label: string } & CheckboxProps;

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ name: props.name, type: "checkbox" });
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div className="flex flex-col gap-1">
      <FormControlLabel
        control={<Checkbox {...field} {...props} />}
        label={label}
      />
      {errorText && <span className="text-red-500">{errorText}</span>}
    </div>
  );
};

export default FormikCheckbox;
