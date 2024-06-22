import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import BlogDialog from "../Components/BlogDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Baseurl } from "../BaseUrl";
import BlogCard from "../Components/BlogCard";
import ConnectionLost from "../Common/ConnectionLost";
import Loader from "../Common/Loader";
import axios from "axios";
import toast from "react-hot-toast";

const BlogsPage = () => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const queryClient = useQueryClient();

  const fetchingBlogs = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog`, {
      headers: {
        Authorization: `Bearer ${Baseurl.token}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchingBlogs,
  });

  const handleCreateBlog = (blogData, actions) => {
    // console.log("blog datat==========>", blogData);
    axios
      .post(`${Baseurl.baseurl}/api/blog`, blogData, {
        headers: {
          Authorization: `Bearer ${Baseurl.token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries("blogsData");
          toast.success(res.data.message);
          setOpenBlogDialog(false);
          actions.setSubmitting(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 sm:text-32size">
          All Blogs
        </h1>
        <button
          type="button"
          onClick={() => setOpenBlogDialog(true)}
          className="flex items-center justify-center gap-x-2 rounded-md bg-indigo-700 px-3.5 py-2.5 text-14size font-semibold tracking-wide text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create new blog
          <PlusCircleIcon className="-mr-0.5 h-5 w-5" />
        </button>
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.blogs?.map((person, index) => (
              <BlogCard person={person} key={index} />
            ))}
          </ul>
        )}
      </div>
      {openBlogDialog && (
        <BlogDialog
          open={openBlogDialog}
          setter={setOpenBlogDialog}
          handler={handleCreateBlog}
        />
      )}
    </div>
  );
};

export default BlogsPage;
