import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { useDebounce } from "react-use";

export interface ISearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fetch: () => void;
}

export function SearchInput(props: ISearchInputProps) {
  const { onChange, value, placeholder } = props;
  const [, setState] = React.useState(false);
  const [val, setVal] = React.useState(value ?? "");
  const [,] = useDebounce(
    () => {
      setState(false);
      onChange(val);
    },
    1000,
    [val]
  );
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        props.fetch();
      }}
    >
      <TextField
        size="small"
        label={placeholder || "Search"}
        placeholder={placeholder || "Search"}
        fullWidth
        onChange={(e) => {
          setState(true);
          setVal(e.currentTarget.value);
        }}
        value={val}
        InputProps={{
          style: {
            paddingLeft: "1.25rem",
          },
          startAdornment: (
            <InputAdornment position="start" className="relative">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
