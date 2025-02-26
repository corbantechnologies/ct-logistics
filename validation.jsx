import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required"),
  last_name: Yup.string().required("This field is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password cannot be less than 5 characters")
    .required("This field is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 5 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const ResetPassword = Yup.object().shape({
  code: Yup.string()
    .required("This field is required")
    .min(6, "Invalid code")
    .max(6, "Invalid code"),
  password: Yup.string()
    .min(5, "Password cannot be less than 5 characters")
    .required("This field is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 5 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const CodeSchema = Yup.object().shape({
  code: Yup.string().required().min(6, "Invalid code").max(6, "Invalid code"),
});

export { RegistrationSchema, ResetPassword, CodeSchema };
