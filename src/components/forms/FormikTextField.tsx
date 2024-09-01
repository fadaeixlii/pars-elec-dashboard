import React, { useState } from "react";
import { useField, FieldAttributes } from "formik";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormikTextFieldProps = FieldAttributes<object> &
  TextFieldProps & {
    isNumber?: boolean;
    isPassword?: boolean;
  };

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  isNumber,
  isPassword,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const errorText = meta.error && meta.touched ? meta.error : "";

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  let inputProps = {};

  if (isNumber) {
    inputProps = {
      inputProps: { inputMode: "decimal", pattern: "-?[0-9]*[.,]?[0-9]*" },
    };
  }

  return (
    <TextField
      {...field}
      {...props}
      type={isPassword ? (showPassword ? "text" : "password") : props.type}
      helperText={errorText}
      error={!!errorText}
      label={props.label + ` ${props.placeholder ?? ""}`}
      InputProps={{
        ...inputProps,
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default FormikTextField;
