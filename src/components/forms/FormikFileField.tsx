import * as React from "react";
import InputFileUpload from "../FileUploadBtn";
import { FormHelperText, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export type IFormikFileFieldProps = TextFieldProps & {
  name: string;
  ref: React.LegacyRef<HTMLInputElement>;
  accept: string;
};

export function FormikFileField(props: IFormikFileFieldProps) {
  const [field, meta, helper] = useField(props.name);
  const handleOnChange = (file: File) => {
    helper.setValue(file);
  };
  const errorText = meta.error && meta.touched ? meta.error : "";
  console.log(errorText);

  return (
    <div className="flex flex-col gap-2">
      <InputFileUpload
        {...field}
        ref={props.ref}
        accept={props.accept}
        handleChange={handleOnChange}
        name={props.name}
      />
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </div>
  );
}
