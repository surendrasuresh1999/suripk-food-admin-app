import numeral from "numeral";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

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
const CommonChart = ({ graphData }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        width={600}
        height={300}
        data={graphData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <XAxis dataKey="month" />
        <YAxis tick={<YAxisContentWrapper />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CommonChart;
