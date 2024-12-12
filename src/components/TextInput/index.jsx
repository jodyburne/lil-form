import React from "react";
import {
  TextField,
} from "@mui/material";

const TextInput = ({ name, value, setValue, error, setError, required, validate }) => {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      label={name}
      error={!!error}
      onChange={(e) => {
        setError("");
        setValue(e.target.value);
      }}
      value={value}
      required={required}
      onBlur={validate}
      helperText={error && error}
    />
  );
};

export default TextInput;
