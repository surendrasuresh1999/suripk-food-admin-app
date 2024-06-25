import * as yup from "yup";

export const foodItemSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  discription: yup.string().required("discription is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d+)?$/, "Price must be a valid number"),
});

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  discription: yup.string().required("Description is required"),
});

export const userLoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
