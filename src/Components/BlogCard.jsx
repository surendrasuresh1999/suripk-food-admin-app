import { HeartIcon } from "@heroicons/react/20/solid";
import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ person }) => {
  return (
    <li
      key={person.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="p-4">
        <div className="h-56">
          <img
            className="h-full w-full flex-shrink-0 rounded-md bg-gray-300 object-cover object-center"
            src={person.imageUrl}
            alt=""
          />
        </div>
        <div className="flex-1 space-y-2 truncate pt-3">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-18size font-medium text-gray-900">
              {person.title}
            </h3>
            {person.likedUsers?.length > 0 && (
              <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {numeral(person.likedUsers?.length).format("0,a")}
                <HeartIcon className="h-3 w-3 text-orange-500" />
              </span>
            )}
          </div>
          <p className="truncate text-sm text-gray-500">{person.discription}</p>
          <Link
            to={`/blogs/${person._id}`}
            className="inline-block rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-100"
          >
            Read More
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
