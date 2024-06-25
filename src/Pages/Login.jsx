import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginSchema } from "../FormikSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (values, actions) => {
    // console.log(values);
    axios
      .post(`${Baseurl.baseurl}/api/admin/login`, values)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem(
            "foodieAdminUserDetails",
            JSON.stringify(res.data.user),
          );
          Cookies.set("jwtToken", res.data.token, { expires: 120 });
          navigate("/");
          actions.resetForm();
        } else {
          toast.error(res.data.message);
          console.log("res", res);
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
  };
  return (
    <div className="h-dvh bg-gray-900">
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="rounded-md bg-gray-600 p-4 sm:mx-auto sm:w-full sm:max-w-sm 2xl:max-w-md">
          <h2 className="mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-white sm:text-30size">
            Sign in
          </h2>
          <Formik
            initialValues={userObject}
            validationSchema={userLoginSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-2">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        {key.charAt(0).toUpperCase()}
                        {key.slice(1, key.length)}
                      </label>
                      {key === "password" && (
                        <p className="font-600 text-right text-14size tracking-wide text-gray-900">
                          <Link
                            to="/forgot-password"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot Password?
                          </Link>
                        </p>
                      )}
                    </div>
                    {key === "password" ? (
                      <Field name="password">
                        {({
                          field /* { name, value, onChange, onBlur } */,
                        }) => (
                          <div className="relative rounded-md shadow-sm">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter Password"
                              className={`block w-full rounded-md border bg-gray-600 pr-10 ${
                                touched[key] && errors[key]
                                  ? "border-red-500"
                                  : "border-gray-500"
                              } text-white placeholder:text-slate-400`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {showPassword ? (
                                <EyeOff className="text-slate-400" />
                              ) : (
                                <Eye className="text-slate-400" />
                              )}
                            </button>
                          </div>
                        )}
                      </Field>
                    ) : (
                      <Field
                        type={key}
                        name={key}
                        placeholder="Enter email address"
                        className={`grow rounded-md border bg-gray-600 ${
                          touched[key] && errors[key]
                            ? "border-red-500"
                            : "border-gray-500"
                        } text-white placeholder:text-slate-400`}
                      />
                    )}
                    <ErrorMessage
                      name={key}
                      render={(msg) => (
                        <p className="text-12size font-semibold tracking-wide text-red-600">
                          {msg}
                        </p>
                      )}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-2 text-14size font-medium tracking-wide text-white"
                >
                  {isSubmitting ? (
                    <LoaderCircle
                      className="animate-spin text-white"
                      size={21}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
