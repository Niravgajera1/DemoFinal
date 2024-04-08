import * as Yup from "yup";
export const campaingshemas = Yup.object({
  yourname: Yup.string().min(3).max(25).required("Please Enter Your Name"),
  title: Yup.string().min(6).max(25).required("Please Enter Campaign Title"),
  category: Yup.string().min(3).max(25).required("Please Enter Category"),
  story: Yup.string()
    .min(15)
    .max(100)
    .required("Please Explain Campaign Story"),
  goal: Yup.number().min(1).required("Please Enter Goal Amount"),
  enddate: Yup.date().required("Please Select Last Date"),
});
