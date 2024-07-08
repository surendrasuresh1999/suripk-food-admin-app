import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Baseurl } from "../BaseUrl";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import ServiceCard from "../Components/ServiceCard";
import NodataFound from "../Common/NodataFound";
import Calender from "../Common/Calender";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const ServicesPage = () => {
  const jwtToken = Cookies.get("adminJwtToken");
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchingServices = async () => {
    return await fetch(`${Baseurl.baseurl}/api/service/admin`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["servicesData"],
    queryFn: fetchingServices,
  });

  const hanldeCatchDate = (date) => {
    if (date === "Invalid Date") {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const filteredServices =
    selectedDate !== null
      ? data?.services.filter((service) => {
          const eventDate = dayjs(service.eventDate, "DD/MM/YYYY");
          return eventDate.isSame(dayjs(selectedDate, "DD/MM/YYYY"), "day"); // Compare dates by day
        })
      : data?.services;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 dark:text-white sm:text-32size">
          All Services
        </h1>
        <Calender
          viewsArr={["year", "month", "day"]}
          disablePast={false}
          disableFuture={false}
          format="DD/MM/YYYY"
          hanlder={hanldeCatchDate}
          setterFun={setSelectedDate}
          relation=""
        />
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : filteredServices.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices?.map((service, index) => (
              <ServiceCard data={service} key={index} />
            ))}
          </ul>
        ) : (
          <NodataFound
            subTitle={
              selectedDate === null
                ? "There is no Services data found"
                : "No services found based on date"
            }
          />
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
