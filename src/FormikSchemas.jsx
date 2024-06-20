import * as yup from "yup";

export const productSchema = yup.object().shape({
    image: yup.string().required("Required!"),
    newPassword: yup.string().min(8).matches(newPasswordRules,{message:"**Please create a stronger password"}).required("Required!"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'),null],"Password are not matching!").required("Required!"),
})
