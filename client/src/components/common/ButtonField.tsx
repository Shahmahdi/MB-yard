import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  submitButton: {
    marginTop: "1rem !important",
    width: "100%",
    backgroundColor: "#55B9A3 !important",
    color: "white !important",
    border: "none !important",
    letterSpacing: "0.1rem !important",
    "&:hover": {
      backgroundColor: "#94cfc2 !important",
      border: "none !important"
    },
    "&:disabled": {
      backgroundColor: "lightgray !important"
    }
  }
}));

interface ButtonFieldProps {
  text: string;
  onSubmit: () => void;
  disabled: boolean;
}

export const ButtonField = (props: ButtonFieldProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.submitButton}
      variant='outlined'
      onClick={props.onSubmit}
      disabled={props.disabled}>
      {props.text}
    </Button>
  );
};
