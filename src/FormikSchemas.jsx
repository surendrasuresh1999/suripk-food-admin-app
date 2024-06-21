import * as yup from "yup";

export const foodItemSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  discription: yup.string().required("discription is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d+)?$/, "Price must be a valid number"),
});
