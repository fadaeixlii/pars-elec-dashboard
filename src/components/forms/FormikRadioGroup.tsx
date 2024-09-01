import React from "react";
import { useField } from "formik";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroupProps,
} from "@mui/material";

type FormikRadioGroupProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
} & RadioGroupProps;

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  label,
  options,
  ...props
}) => {
  const [field] = useField(props.name);

  return (
    <div>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...field} {...props}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default FormikRadioGroup;
