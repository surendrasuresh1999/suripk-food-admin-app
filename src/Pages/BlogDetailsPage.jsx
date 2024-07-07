import React from "react";
import { Baseurl } from "../BaseUrl";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/16/solid";
import numeral from "numeral";
import Cookies from "js-cookie";

const BlogDetailsPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const jwtToken = Cookies.get("adminJwtToken");

  const fetchBlogDetails = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog/${params.id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: fetchBlogDetails,
  });

  return (
    <div className="m-auto max-w-5xl">
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : (
        <div className="space-y-4">
          <h1 className="text-18size font-bold tracking-wide text-black dark:text-white sm:text-36size">
            {data.blogPost.title.charAt(0).toUpperCase() +
              data.blogPost.title.slice(1)}
          </h1>
          <img
            src={data.blogPost.imageUrl}
            alt="banner-img"
            className="max-h-96 w-full rounded-md object-cover object-center"
          />
          <p className="text-justify text-gray-600 dark:text-white">
            {data.blogPost.discription}
          </p>
          <div className="flex items-center justify-between">
            <Link
              to={"/blogs"}
              className="flex max-w-max items-center gap-2 rounded-md border border-orange-400 bg-orange-50 p-3 text-sm font-semibold text-orange-600 hover:bg-orange-100"
            >
              <ArrowLeftIcon className="h-4 w-4 text-orange-600" />
              Go Back
            </Link>
            {data.blogPost.likedUsers?.length > 0 && (
              <span className="flex items-center gap-1 text-20size font-semibold text-orange-500">
                {data.blogPost.likedUsers?.length > 0 &&
                  numeral(data.blogPost.likedUsers?.length).format("0,a")}
                <HeartIcon className="h-5 w-5 text-orange-500" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsPage;
