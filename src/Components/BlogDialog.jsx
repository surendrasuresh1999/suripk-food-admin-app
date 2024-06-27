import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloudinaryWidget from "../Common/CloudinaryWidget";
import { LoaderCircle } from "lucide-react";
import { blogSchema } from "../FormikSchemas";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Context from "../Context/Context";

const BlogDialog = ({ open, setter, handler }) => {
  const [foodImageurl, setFoodImageurl] = useState("");
  const { editableObj, setEditableObj, defaultMode } = useContext(Context);
  const [blogObj, setBlogObj] = useState({
    title: "",
    discription: "",
  });

  const handleFormSubmit = (values, actions) => {
    if (foodImageurl === "") {
      toast.error("Please upload a food image");
      actions.setSubmitting(false);
    } else {
      const data = { ...values, imageUrl: foodImageurl };
      const actionType =
        Object.keys(editableObj).length === 0 ? "new" : "update";
      handler(data, actions, actionType);
    }
  };
  useEffect(() => {
    if (Object.keys(editableObj).length !== 0 && open) {
      setBlogObj({
        title: editableObj?.title,
        discription: editableObj?.discription,
      });
      setFoodImageurl(editableObj?.imageUrl);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setter(false);
        setEditableObj({});
      }}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle
        className={`flex flex-col justify-between ${defaultMode ? "border-b bg-gray-900 text-white" : "bg-white text-gray-800"} gap-1 sm:flex-row sm:items-center sm:gap-0`}
      >
        Add New Blog <CloudinaryWidget setterFun={setFoodImageurl} />
      </DialogTitle>
      <DialogContent
        dividers={true}
        className={`${defaultMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      >
        <Formik
          initialValues={blogObj}
          validationSchema={blogSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-2">
              {Object.keys(blogObj).map((key, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label
                    htmlFor={key}
                    className={`flex items-center gap-1 text-14size font-semibold tracking-wide ${defaultMode ? "text-white" : "text-black"} sm:text-16size`}
                  >
                    {key.charAt(0).toUpperCase()}
                    {key.slice(1, key.length)}
                  </label>

                  {key === "title" ? (
                    <Field
                      type={"text"}
                      name={key}
                      className={`grow rounded-md border border-gray-400 ${defaultMode ? "bg-gray-500 text-white" : "bg-white text-black"} p-1.5 outline-none`}
                    />
                  ) : (
                    <Field
                      as={"textarea"}
                      name={key}
                      rows={3}
                      cols={4}
                      style={{ resize: "none" }}
                      className={`grow rounded-md border border-gray-400 ${defaultMode ? "bg-gray-500 text-white" : "bg-white text-black"} p-1.5 outline-none`}
                    />
                  )}

                  <ErrorMessage
                    name={key}
                    render={(msg) => (
                      <p className="text-12size font-bold tracking-wide text-red-600">
                        {msg}
                      </p>
                    )}
                  />
                </div>
              ))}
              {foodImageurl !== "" && (
                <div className="flex items-start gap-2">
                  <img
                    src={foodImageurl}
                    alt="food-img"
                    className="h-24 w-24 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFoodImageurl("");
                    }}
                    className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-500"
                  >
                    Change image
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-2 text-14size font-medium tracking-wide text-white"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin text-white" size={21} />
                ) : Object.keys(editableObj).length === 0 ? (
                  "Create"
                ) : (
                  "Update"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;
