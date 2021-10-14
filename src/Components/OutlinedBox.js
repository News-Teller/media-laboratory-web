import React from "react";
import TextField from "@material-ui/core/TextField";

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const OutlinedDiv = ({ children, label, ...other }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent
      }}
      inputProps={{ children: children }}
      {...other}
    />
  );
};

export default OutlinedDiv;
