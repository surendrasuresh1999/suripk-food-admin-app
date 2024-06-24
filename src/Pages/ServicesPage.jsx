import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Baseurl } from "../BaseUrl";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import ServiceCard from "../Components/ServiceCard";
import NodataFound from "../Common/NodataFound";

const ServicesPage = () => {
  const queryClient = useQueryClient();

  const fetchingServices = async () => {
    return await fetch(`${Baseurl.baseurl}/api/service`, {
      headers: {
        Authorization: `Bearer ${Baseurl.token}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["servicesData"],
    queryFn: fetchingServices,
  });
  console.log(data);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 dark:text-white sm:text-32size">
          All Services
        </h1>
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data.services.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.services?.map((service, index) => (
              <ServiceCard data={service} key={index} />
            ))}
          </ul>
        ) : (
          <NodataFound subTitle={"There is no Services data found"} />
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
