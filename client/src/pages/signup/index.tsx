import React, { useState } from "react";
import { Alert, Grid } from "@mui/material";
import { Textfield } from "../../components/common/Textfield";
import { validate } from "../../utilities/validation";
import { makeStyles } from "@mui/styles";
import { ActionResponse } from "../../stores/InterfaceTypes";
import { ButtonField } from "../../components/common/ButtonField";
import { setUserInfo, signup, setUserLoginInfo } from "../../stores/user/Actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { login } from "../../stores/auth/Actions";
import { SnacbarField } from "../../components/common/SnacbarField";

const errObjInitialState = {
  isValid: null,
  message: ""
}

const useStyles = makeStyles(() => ({
  signupFormWrapper: {
    width: "20rem !important",
    marginBottom: "1rem !important",
    margin: "auto"
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
  }
}));

const SignupPageComponent = (props: any) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [showSnacbar, setShowSnacbar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [formDataErr, setFormDataErr] = useState({
    name: errObjInitialState,
    email: errObjInitialState,
    phone: errObjInitialState,
    password: errObjInitialState,
    confirmPassword: errObjInitialState
  });
  const [response, setResponse] = useState({} as ActionResponse);

  const onChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onBlur = (name: string, value: (string | Object)) => {
    const validationResponse = validate(name.toUpperCase(), value);
    setFormDataErr({
      ...formDataErr,
      [name]: validationResponse
    });
  };

  const hasNoError = () =>
    formDataErr.name.isValid &&
    formDataErr.email.isValid &&
    formDataErr.phone.isValid &&
    formDataErr.password.isValid &&
    formDataErr.confirmPassword.isValid;

  const onSubmit = async () => {
    setResponse({ status: "", message: "" });
    setLoading(true);
    console.log(`formData: `, formData);
    const reqData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    const res: any = await signup(reqData);
    console.log(`onSubmit res: `, res)
    if (res.status === "fail") {
      setResponse(res);
    } else {
      props.setUserInfo!(res.userInfo);
      const loginReqData = {
        email: formData.email,
        password: formData.password
      }
      const loginResponse: any = await login(loginReqData);
      console.log(`loginResponse: `, loginResponse)
      if (loginResponse.status === "fail") {
        setShowSnacbar(true);
      } else {
        props.setUserLoginInfo({
          ...res.userInfo,
          ...loginResponse.userInfo
        })
        props.history.push("/landing");
      }
    }
    setLoading(false);
  };

  return (
    <Grid container className={classes.signupFormWrapper}>
      <Grid item xs={12} className={classes.label}>
        Registration Form
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Name'
          required={true}
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("name", e.target.value)
          }
          onBlur={() => onBlur("name", formData.name)}
          error={formDataErr.name.isValid === false}
          helperText={formDataErr.name.message}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Email Address'
          required={true}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("email", e.target.value)
          }
          onBlur={() => onBlur("email", formData.email)}
          error={formDataErr.email.isValid === false}
          helperText={formDataErr.email.message}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Phone'
          required={true}
          value={formData.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("phone", e.target.value)
          }
          onBlur={() => onBlur("phone", formData.phone)}
          error={formDataErr.phone.isValid === false}
          helperText={formDataErr.phone.message}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Password'
          type="password"
          required={true}
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("password", e.target.value)
          }
          onBlur={() => onBlur("password", formData.password)}
          error={formDataErr.password.isValid === false}
          helperText={formDataErr.password.message}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Textfield
          label='Confirm Password'
          type="password"
          required={true}
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("confirmPassword", e.target.value)
          }
          onBlur={() => onBlur("confirmPassword", {
            password: formData.password,
            confirmPassword: formData.confirmPassword
          })}
          error={formDataErr.confirmPassword.isValid === false}
          helperText={formDataErr.confirmPassword.message}
          disabled={loading}
        />
      </Grid>
      {response.status === "fail" && (
        <Grid item xs={12} className={classes.contentWrapper}>
          <Alert severity='error'>{response.message}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <ButtonField
          text='SIGN UP'
          onSubmit={onSubmit}
          disabled={!hasNoError() || loading}
        />
      </Grid>
      <SnacbarField
        message="Registration completed successfully but login failed. Please try to login again."
        open={showSnacbar}
        onClose={() => setShowSnacbar(false)}
      />
    </Grid>
  );
};

export const SignupPage = connect(null, { setUserInfo, setUserLoginInfo })(withRouter(SignupPageComponent));
