import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FieldAttributes } from "formik";
import { TextFieldProps } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
type InputFileUploadProps = FieldAttributes<object> &
  TextFieldProps & {
    accept: string;
    handleChange: (file: File) => void;
    ref: React.LegacyRef<HTMLInputElement>;
  };

export default function InputFileUpload(props: InputFileUploadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        ref={props.ref}
        accept={props.accept}
        onChange={(e) => {
          const d = e.currentTarget.files[0];
          props.handleChange(d);
        }}
      />
    </Button>
  );
}
