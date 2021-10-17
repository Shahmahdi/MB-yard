export const validate = (type: string, value: string) => {
  switch (type) {
    case "EMAILADDRESS":
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
    default:
      return {
        isValid: true,
        message: ""
      };
  }
};
