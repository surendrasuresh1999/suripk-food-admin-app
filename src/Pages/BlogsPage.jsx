import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useContext, useState } from "react";
import BlogDialog from "../Components/BlogDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Baseurl } from "../BaseUrl";
import BlogCard from "../Components/BlogCard";
import ConnectionLost from "../Common/ConnectionLost";
import Loader from "../Common/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import NodataFound from "../Common/NodataFound";
import Context from "../Context/Context";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const jwtToken = Cookies.get("adminJwtToken");
  const queryClient = useQueryClient();
  const { editableObj, setEditableObj, defaultMode } = useContext(Context);
  const navigate = useNavigate();

  const fetchingBlogs = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog/admin`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchingBlogs,
  });

  const handleCreateBlog = (blogData, actions, action) => {
    const httpMethod = action === "new" ? "POST" : "PUT";
    const urlString =
      action === "new" ? "blog/admin" : `blog/admin/update/${editableObj?._id}`;
    axios({
      method: httpMethod,
      url: `${Baseurl.baseurl}/api/${urlString}`,
      data: blogData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries("blogsData");
          toast.success(res.data.message);
          setOpenBlogDialog(false);
          actions.setSubmitting(false);
          setEditableObj({});
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteBlog = (blogId) => {
    swal({
      title: "Are you sure!",
      text: "Are you sure? want to delete Blog, This action cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: `${defaultMode ? "dark-swal" : "white-swal"}`,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${Baseurl.baseurl}/api/blog/admin/${blogId}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((res) => {
            if (res.data.status) {
              toast.success(res.data.message);
              queryClient.invalidateQueries("blogsData");
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 dark:text-white sm:text-32size">
          All Blogs
        </h1>
        <button
          type="button"
          onClick={() => setOpenBlogDialog(true)}
          className="flex items-center justify-center gap-x-2 rounded-md bg-indigo-700 px-3.5 py-2.5 text-14size font-semibold tracking-wide text-white hover:bg-indigo-600"
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
        ) : data && data.status === 401 ? (
          navigate("/login")
        ) : data.blogs?.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.blogs?.map((person, index) => (
              <BlogCard
                person={person}
                key={index}
                setter={setOpenBlogDialog}
                handlerDelete={handleDeleteBlog}
              />
            ))}
          </ul>
        ) : (
          <NodataFound subTitle={"No blogs are added till now!"} />
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
