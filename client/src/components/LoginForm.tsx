import React, { useState } from "react";
import { Grid, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Textfield } from "./common/Textfield";
import { ButtonField } from "./common/ButtonField";
import { validate } from "../utilities/validation";
import { login } from "../stores/auth/Actions";
import { ActionResponse } from "../stores/InterfaceTypes";

const useStyles = makeStyles(() => ({
  loginFormWrapper: {
    width: "20rem !important",
    marginBottom: "1rem !important"
  },
  label: {
    color: "rgba(31,41,55,var(--tw-text-opacity))",
    lineHeight: "1.75rem",
    fontWeight: 600,
    padding: "0.5rem 1rem !important",
    backgroundColor: "#e0ef6f",
    fontSize: "1rem",
    marginBottom: "0.5rem !important"
  },
  contentWrapper: {
    margin: "0 1rem 0.5rem !important"
  },
  signupText: {
    textAlign: "center",
    margin: "0 2rem"
  },
  signupLink: {
    color: "#1976D2"
  }
}));

export const LoginForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: ""
  });
  const [formDataErr, setFormDataErr] = useState({
    emailAddress: {
      isValid: null,
      message: ""
    },
    password: {
      isValid: null,
      message: ""
    }
  });
  const [response, setResponse] = useState({} as ActionResponse);

  const onChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onBlur = (name: string, value: string) => {
    const validationResponse = validate(name.toUpperCase(), value);
    setFormDataErr({
      ...formDataErr,
      [name]: validationResponse
    });
  };

  const hasNoError = () =>
    formDataErr.emailAddress.isValid && formDataErr.password.isValid;

  const onSubmit = async () => {
    setResponse({ status: "", message: "" });
    setLoading(true);
    console.log(`formData: `, formData);
    const res: any = await login(formData);
    console.log(`onSubmit res: `, res)
    if (res.status === "fail") {
      setResponse(res);
    }
    setLoading(false);
  };

  return (
    <Grid container className={classes.loginFormWrapper}>
      <Grid item xs={12} className={classes.label}>
        <div>Login</div>
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Email Address'
          required={true}
          value={formData.emailAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("emailAddress", e.target.value)
          }
          onBlur={() => onBlur("emailAddress", formData.emailAddress)}
          error={formDataErr.emailAddress.isValid === false}
          helperText={formDataErr.emailAddress.message}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Password'
          required={true}
          value={formData.password}
          onChange={(e: any) => onChange("password", e.target.value)}
          onBlur={(e: any) => onBlur("password", formData.password)}
          error={formDataErr.password.isValid === false}
          helperText={formDataErr.password.message}
          disabled={loading}
        />
      </Grid>
      {response.status === "fail" && (
        <Grid item xs={12} className={classes.contentWrapper}>
          <Alert severity='error'>{response.message}</Alert>
        </Grid>
      )}
      <Grid item xs={12} className={classes.contentWrapper}>
        <ButtonField
          text='LOGIN'
          onSubmit={onSubmit}
          disabled={!hasNoError() || loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.signupText}>
        Don't have an account?{" "}
        <Link className={classes.signupLink} to='/signup'>
          Sign up
        </Link>
      </Grid>
    </Grid>
  );
};
