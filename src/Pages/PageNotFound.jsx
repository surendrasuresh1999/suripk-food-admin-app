import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import pageNotFound from "../assets/404.svg";

const PageNotFound = () => {
  return (
    <>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center pb-6">
          <img
            src={pageNotFound}
            alt="page-not-found"
            className="h-64 w-auto object-center"
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-600 dark:text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base font-medium text-gray-900 dark:text-white sm:mt-6">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              to={"/"}
              className="inline-flex items-center gap-x-2 rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm "
            >
              <ArrowLeft className="-mr-0.5 h-5 w-5" aria-hidden="true" />
              Go back home
            </Link>
          </div>
        </div>
      </>
  );
};

export default PageNotFound;
