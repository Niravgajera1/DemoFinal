import * as Yup from "yup";
export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(8).required("Please Enter Your Password"),
  confirmpassword: Yup.string()
    .required("Enter Confirm Password")
    .oneOf([Yup.ref("password")], "Password Dose Not Match"),
});
