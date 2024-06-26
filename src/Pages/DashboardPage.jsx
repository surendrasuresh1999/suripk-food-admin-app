import {
  ArrowTrendingUpIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import numeral from "numeral";
import React, { useState } from "react";
import { Baseurl } from "../BaseUrl";
import Loader from "../Common/Loader";
import Tooltip from "@mui/material/Tooltip";
import ConnectionLost from "../Common/ConnectionLost";
import {
  ArrowTrendingDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import CommonChart from "../Common/CommonChart";
import Calender from "../Common/Calender";

const cards = [
  {
    title: "Total users",
    value: 459,
    icon: <UserCircleIcon className="h-9 w-9 text-[#28AB6D]" />,
    gradientFrom: "bg-gradient-to-r from-[#108E51] via-[#28AB6D] to-[#3EC181]",
    from: "bg-[#108E51]",
    via: "bg-[#28AB6D]",
    lable: "users",
  },
  {
    title: "Total orders",
    value: 400,
    icon: <ShoppingCartIcon className="h-9 w-9 text-[#DD4FF1]" />,
    gradientFrom: "bg-gradient-to-r from-[#C92FE6] via-[#DD4FF1] to-[#EF73FF]",
    from: "bg-[#C92FE6]",
    via: "bg-[#DD4FF1]",
    lable: "order",
  },
  {
    title: "Total items",
    value: 120,
    icon: <ShoppingBagIcon className="h-9 w-9 text-[#367FD5]" />,
    gradientFrom: "bg-gradient-to-r from-[#2069CD] via-[#367FD5] to-[#4994DB]",
    from: "bg-[#2069CD]",
    via: "bg-[#367FD5]",
    lable: "items",
  },
];

const graphCard = [
  {
    title: "Orders graph",
    tooltipText: "Orders graph is current year-wise only",
  },
  {
    title: "Users graph",
    tooltipText: "Users graph is current year-wise only",
  },
];

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState("");
  const fetchAllBoardData = async () => {
    return await fetch(`${Baseurl.baseurl}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${Baseurl.token}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["boardData"],
    queryFn: fetchAllBoardData,
  });
  const hanldeCatchDate = (date) => {
    // console.log("asdfasdfadsf", date.split(" ")[0]);
    setSelectedRelation(date.split(" ")[0]);
    if (date === "Invalid Date") {
      setSelectedYear(null);
    } else {
      setSelectedYear(date.split(" ")[1]);
    }
  };

  // const filteredData =
  //   selectedDate !== null
  //     ? data?.services.filter((service) => {
  //         const eventDate = dayjs(service.eventDate, "DD/MM/YYYY");
  //         return eventDate.isSame(dayjs(selectedDate, "DD/MM/YYYY"), "day"); // Compare dates by day
  //       })
  //     : data?.services;

  return (
    <div className="space-y-6">
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <li
                key={i}
                className={`space-y-4 rounded-md ${card.gradientFrom} p-2 shadow`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-18size font-medium tracking-wide text-white">
                      {card.title}
                    </h1>
                    <span className="text-24size font-bold tracking-wide text-white">
                      {numeral(data?.data[i]?.total).format("0,a")}
                    </span>
                  </div>
                  <span className={`rounded-md ${card.from} p-3`}>
                    {card.icon}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-white">
                  <span
                    className={`${card.via} rounded-md px-2 py-1 font-semibold tracking-wide`}
                  >
                    +{data?.data[i]?.percentage}{" "}
                  </span>
                  {parseFloat(data?.data[i]?.percentage.replace("%", "")) >=
                  50 ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5 text-white" />
                  )}
                </p>
              </li>
            ))}
          </ul>
          {graphCard.map((graph, index) => (
            <div
              key={index}
              className="space-y-5 rounded-lg bg-white p-2 shadow dark:bg-gray-900"
            >
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <h1 className="flex items-center gap-1 text-24size font-semibold text-gray-700 dark:text-white sm:text-28size">
                  {graph.title}{" "}
                  <Tooltip
                    title={graph.tooltipText}
                    arrow
                    placement="right-start"
                  >
                    <QuestionMarkCircleIcon className="mt-1.5 h-5 w-5 text-gray-500" />
                  </Tooltip>
                </h1>
                <Calender
                  viewsArr={["year"]}
                  disablePast={false}
                  disableFuture={true}
                  format="YYYY"
                  hanlder={hanldeCatchDate}
                  setterFun={setSelectedYear}
                  relation={index === 0 ? "orders" : "users"}
                />
              </div>
              <CommonChart
                graphData={
                  index === 0 ? data.ordersChartData : data.usersChartData
                }
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
