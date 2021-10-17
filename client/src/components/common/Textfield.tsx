import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  textbox: {
    width: "100%"
  }
}));

interface TextfieldProps {
  label: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  type?: string
}

export const Textfield = (props: TextfieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textbox}
      type={props.type ? props.type : "text"}
      required={props.required}
      id={props.label}
      label={props.label}
      variant='standard'
      value={props.value}
      onChange={props.onChange}
      onBlur={(e) => props.onBlur(e.target.value)}
      disabled={props.disabled}
      error={props.error}
      helperText={props.helperText}
    />
  );
};
