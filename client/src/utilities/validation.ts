export const validate = (type: string, value: any) => {
  switch (type) {
    case "NAME":
      if (!/([^\s])/.test(value)) {
        return {
          isValid: false,
          message: "Name is required"
        };
      } else {
        return {
          isValid: true
        };
      }
    case "EMAIL":
      if (!value) {
        return {
          isValid: false,
          message: "Please enter an email address"
        };
      } else {
        if (
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return {
            isValid: true,
            message: ""
          };
        } else {
          return {
            isValid: false,
            message: "Please enter valid email address"
          };
        }
      }
    case "PASSWORD":
      if (!value) {
        return {
          isValid: false,
          message: "Please enter an password"
        };
      } else {
        if (
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
            value
          )
        ) {
          return {
            isValid: true,
            message: ""
          };
        } else {
          return {
            isValid: false,
            message: "Please enter valid password"
          };
        }
      }
    case "CONFIRMPASSWORD":
      console.log(`confirm password value: `, value, )
      const response = {
        isValid: false,
        message:
          value.confirmPassword.length > 0
            ? "Password does not match"
            : "Please enter a confirm password"
      };
      if (value.password === value.confirmPassword) {
        response.isValid = true;
        response.message = "";
      }
      return response;
    case "PHONE":
      if (value !== undefined && value !== null && value.length !== 0) {
        if (!/^[0-9]*$/.test(value)) {
          return {
            isValid: false,
            message: "Only numeric number"
          };
        } else if(/^(\?0?1[356789][0-9]{8})$/.test(value)){
          return{
            isValid: false,
            message: "Please make sure your contact number is a valid mobile number"
          }
        } else {
          return {
            isValid: true
          };
        }
      } else {
        return {
          isValid: false,
          message: "Mobile number required"
        };
      }
    default:
      return {
        isValid: true,
        message: ""
      };
  }
};
