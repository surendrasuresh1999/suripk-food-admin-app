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

export const passwordChangeSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
