import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import numeral from "numeral";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Baseurl } from "../BaseUrl";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";

const charData = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];
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

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div
        className={`shadow-white-50 flex flex-col items-start gap-1 rounded-md bg-gray-400 px-4 py-2 shadow-lg`}
      >
        {payload.map((payload, index) => (
          <p key={index} className="text-mediumSize mt-0 text-white">
            {payload?.name}:{" "}
            <b className="tracking-wide">
              {numeral(payload?.value).format("0.a")}
            </b>
          </p>
        ))}
      </div>
    );
  }
}

function YAxisContentWrapper({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-1} y={0} dy={5} textAnchor="end" fill="#868686">
        {numeral(payload.value).format("0.a")}
      </text>
    </g>
  );
}

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);

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
                    +{data?.data[i]?.percentage}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <div className="space-y-5 rounded-lg bg-white p-2 shadow dark:bg-gray-900">
            <div className="flex flex-col justify-between sm:flex-row sm:items-center">
              <h1 className="text-24size font-semibold text-gray-700 dark:text-white">
                Orders graph
              </h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={selectedDate}
                    views={["year"]}
                    onChange={(date) => setSelectedDate(date)}
                    disableFuture
                    sx={{ width: "100%", marginTop: "0px" }}
                    format="YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                width={600}
                height={300}
                data={data.ordersChartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <XAxis dataKey="month" />
                <YAxis tick={<YAxisContentWrapper />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-5 rounded-lg bg-white p-2 shadow dark:bg-gray-900">
            <h1 className="text-24size font-semibold text-gray-700 dark:text-white">
              Users graph
            </h1>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                width={600}
                height={300}
                data={charData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <XAxis dataKey="name" />
                <YAxis tick={<YAxisContentWrapper />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
