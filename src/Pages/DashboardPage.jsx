import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
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
  },
  {
    title: "Total orders",
    value: 400,
    icon: <ShoppingCartIcon className="h-9 w-9 text-[#DD4FF1]" />,
    gradientFrom: "bg-gradient-to-r from-[#C92FE6] via-[#DD4FF1] to-[#EF73FF]",
    from: "bg-[#C92FE6]",
    via: "bg-[#DD4FF1]",
  },
  {
    title: "Total items",
    value: 120,
    icon: <ShoppingBagIcon className="h-9 w-9 text-[#367FD5]" />,
    gradientFrom: "bg-gradient-to-r from-[#2069CD] via-[#367FD5] to-[#4994DB]",
    from: "bg-[#2069CD]",
    via: "bg-[#367FD5]",
  },
];

const DashboardPage = () => {
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
        <text x={-1} y={0} dy={5} textAnchor="end" fill="#868686" className="text-red-400">
          {numeral(payload.value).format("0.a")}
        </text>
      </g>
    );
  }
  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((data, i) => (
          <li
            key={i}
            className={`space-y-4 rounded-md ${data.gradientFrom} p-2 shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-18size font-medium tracking-wide text-white">
                  {data.title}
                </h1>
                <span className="text-24size font-bold tracking-wide text-white">
                  {data.value}
                </span>
              </div>
              <span className={`rounded-md ${data.from} p-3`}>{data.icon}</span>
            </div>
            <p className="flex items-center gap-1 text-white">
              <span
                className={`${data.via} rounded-md px-2 py-1 font-semibold tracking-wide`}
              >
                +90%
              </span>
              Last month
            </p>
          </li>
        ))}
      </ul>
      <div className="space-y-5 rounded-lg bg-white p-2 shadow dark:bg-gray-900">
        <h1 className="text-24size font-semibold text-gray-700 dark:text-white">
          Orders graph
        </h1>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={600}
            height={300}
            data={data}
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
      <div className="space-y-5 rounded-lg bg-white dark:bg-gray-900 p-2 shadow">
        <h1 className="text-24size font-semibold text-gray-700 dark:text-white">Users graph</h1>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={600}
            height={300}
            data={data}
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
    </div>
  );
};

export default DashboardPage;
