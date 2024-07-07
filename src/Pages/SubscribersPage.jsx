import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Baseurl } from "../BaseUrl";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import NodataFound from "../Common/NodataFound";
import Cookies from "js-cookie";

const SubscribersPage = () => {
  const queryClient = useQueryClient();
  const jwtToken = Cookies.get("adminJwtToken");

  const fetchAllSubscribers = async () => {
    return await fetch(`${Baseurl.baseurl}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["subscribersData"],
    queryFn: fetchAllSubscribers,
  });

  const renderServiceCard = (project, i) => {
    return (
      <li key={i} className="col-span-1 flex-1 rounded-md shadow-sm">
        <div className="flex items-start gap-2 overflow-hidden truncate rounded-md border border-gray-200 bg-white p-2 dark:bg-gray-800">
          <span className="inline-block h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div className="truncate">
            <p className="block font-medium text-gray-900 dark:text-white">
              {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
            </p>
            <p className="block truncate text-gray-500 dark:text-white">
              {project.email}
            </p>
            <p className="mt-1 block w-max truncate rounded-md bg-green-200 px-2 py-1 text-green-500 dark:text-white">
              {project.status}
            </p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-26size font-bold tracking-wide text-gray-700 dark:text-white sm:text-32size">
        All Subscribers
      </h1>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data.subscribers?.length > 0 ? (
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {data.subscribers?.map((project, i) =>
              renderServiceCard(project, i),
            )}
          </ul>
        ) : (
          <NodataFound subTitle={"There is no subscribers are found"} />
        )}
      </div>
    </div>
  );
};

export default SubscribersPage;
