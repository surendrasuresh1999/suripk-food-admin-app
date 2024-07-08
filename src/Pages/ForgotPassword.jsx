import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { passwordChangeSchema } from "../FormikSchemas";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
  };

  const handleFormSubmit = (values, actions) => {
    axios
      .put(`${Baseurl.baseurl}/api/admin/reset-password`, values)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
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
        <div className="rounded-xl bg-slate-500 p-4 sm:mx-auto sm:w-full sm:max-w-sm 2xl:max-w-md">
          <h2 className="mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-white sm:text-30size">
            Reset your password
          </h2>
          <Formik
            initialValues={userObject}
            validationSchema={passwordChangeSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-3">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      {key.charAt(0).toUpperCase()}
                      {key.slice(1, key.length)}
                    </label>
                    <Field
                      type={key}
                      name={key}
                      placeholder={`Enter ${key}`}
                      className={`grow rounded-md border bg-gray-600 ${
                        touched[key] && errors[key]
                          ? "border-red-500"
                          : "border-gray-500"
                      } text-white placeholder:text-slate-400`}
                    />
                    <ErrorMessage
                      name={key}
                      component="p"
                      className="mt-1 text-sm text-red-500"
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
          <p className="mt-2 text-sm text-white">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
