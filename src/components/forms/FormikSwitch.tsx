import React from "react";
import { useField } from "formik";
import { Switch, FormControlLabel, SwitchProps } from "@mui/material";

type FormikSwitchProps = { name: string; label: string } & SwitchProps;

const FormikSwitch: React.FC<FormikSwitchProps> = ({ label, ...props }) => {
  const [field] = useField({ name: props.name, type: "checkbox" });

  return (
    <FormControlLabel
      control={<Switch {...field} {...props} />}
      label={label}
    />
  );
};

export default FormikSwitch;
