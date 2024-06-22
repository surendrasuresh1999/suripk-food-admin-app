import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { LoaderCircle } from "lucide-react";
import React, { useRef, useState } from "react";

const CloudinaryWidget = ({ setterFun }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [showLoader, setShowLoader] = useState(false);

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
          setterFun(result.info.url);
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

  return (
    <span
      onClick={handleUploadImage}
      className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-indigo-700 px-3 py-2 text-14size text-white sm:w-36"
    >
      {showLoader ? (
        <LoaderCircle className="animate-spin text-white" size={21} />
      ) : (
        <>
          {" "}
          Upload image <ArrowUpTrayIcon className="h-4 w-4" />
        </>
      )}
    </span>
  );
};

export default CloudinaryWidget;
