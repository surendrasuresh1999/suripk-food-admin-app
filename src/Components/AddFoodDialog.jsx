import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { foodItemSchema } from "../FormikSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import Transition from "../Common/Transition";
import CloudinaryWidget from "../Common/CloudinaryWidget";
import { ContextData, editableDataObj } from "../Store";

const AddFoodDialog = ({ openDialog, setterFun, handler }) => {
  const [foodImageurl, setFoodImageurl] = useState("");
  const context = useContext(ContextData);
  const [foodObject, setFoodObject] = useState({
    title: "",
    price: "",
    discription: "",
  });

  useEffect(() => {
    if (Object.keys(context?.data).length !== 0 && openDialog) {
      setFoodObject({
        title: context?.data?.title,
        price: context?.data?.price,
        discription: context?.data?.discription,
      });
      setFoodImageurl(context?.data?.imageUrl);
    }
  }, [openDialog]);
  const handleFormSubmit = (values, actions) => {
    if (foodImageurl === "") {
      toast.error("Please upload a food image");
      actions.setSubmitting(false);
    } else {
      const data = { ...values, imageUrl: foodImageurl };
      const actionType =
        Object.keys(context?.data).length === 0 ? "new" : "update";
      handler(data, actions, actionType);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        setterFun(false);
        editableDataObj.data = {};
      }}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center sm:gap-0">
        Add New Food Item <CloudinaryWidget setterFun={setFoodImageurl} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <Formik
          initialValues={foodObject}
          validationSchema={foodItemSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-2">
              {Object.keys(foodObject).map((key, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label
                    htmlFor={key}
                    className="flex items-center gap-1 text-14size font-semibold tracking-wide text-black sm:text-16size"
                  >
                    {key.charAt(0).toUpperCase()}
                    {key.slice(1, key.length)}
                  </label>
                  {key === "discription" ? (
                    <Field
                      as={"textarea"}
                      name={key}
                      rows={2}
                      cols={4}
                      style={{ resize: "none" }}
                      className="grow rounded-md border border-gray-400 p-1.5 outline-none"
                    />
                  ) : (
                    <Field
                      type={key === "price" ? key : "text"}
                      name={key}
                      className="grow rounded-md border border-gray-400 p-1.5 outline-none"
                    />
                  )}
                  <ErrorMessage
                    name={key}
                    render={(msg) => (
                      <p className="font-500 text-12size tracking-wide text-red-600">
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
                      // handleUploadImage();
                    }}
                    className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-500"
                  >
                    Change image
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="mt-3 flex items-center justify-center gap-x-2 rounded-md bg-indigo-700 px-3.5 py-2.5 text-14size font-semibold tracking-wide text-white hover:bg-indigo-600"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin text-white" size={21} />
                ) : (
                  "Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodDialog;
