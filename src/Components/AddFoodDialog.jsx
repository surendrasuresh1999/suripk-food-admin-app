import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { forwardRef, useRef, useState } from "react";
import { foodItemSchema } from "../FormikSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import toast from "react-hot-toast";
import Transition from "../Common/Transition";
import CloudinaryWidget from "../Common/CloudinaryWidget";

const AddFoodDialog = ({ openDialog, setterFun, handler }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [foodImageurl, setFoodImageurl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const foodObject = {
    title: "",
    discription: "",
    price: "",
  };

  const handleUploadImage = () => {
    setShowLoader(true);
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        // please note this don't use my credentials //
        cloudName: "dplj90agk",
        uploadPreset: "oblihw3n",
        // please note this don't use my credentials //
        uploadSignature: false,
        multiple: false,
        returnJustUrl: true,
        closeAfterUpload: false,
        sources: ["local", "url"],
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // console.log("Uploaded image URL:", result.info.url);
          setFoodImageurl(result.info.url);
          setShowLoader(false);
        } else {
          if (error !== undefined || error !== null) {
            console.log("Error uploading image:", error);
          }
          setShowLoader(false);
        }
      },
    );
    widgetRef.current.open();
    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.close();
      }
    };
  };

  const handleFormSubmit = (values, actions) => {
    if (foodImageurl === "") {
      toast.error("Please upload a food image");
      actions.setSubmitting(false);
    } else {
      const data = { ...values, imageUrl: foodImageurl };
      handler(data, actions);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setterFun(false)}
      TransitionComponent={Transition}
      maxWidth="md"
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

                  <Field
                    type={key === "price" ? key : "text"}
                    name={key}
                    className="grow rounded-md border border-gray-400 p-1.5 outline-none"
                  />
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
                className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-2 text-14size font-medium tracking-wide text-white"
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
