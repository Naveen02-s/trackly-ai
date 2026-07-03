import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function AnalyticsSection({ jobs }) {
  // Example: monthly applications trend
  const monthlyData = [
    { month: "Jan", applications: 4 },
    { month: "Feb", applications: 7 },
    { month: "Mar", applications: 5 },
    { month: "Apr", applications: 10 },
    { month: "May", applications: 8 },
    { month: "Jun", applications: 12 },
  ];

  // Status breakdown
  const statusData = [
    {
      name: "Applied",
      value: jobs.filter((j) => j.status === "Applied").length,
    },
    {
      name: "Interview",
      value: jobs.filter((j) => j.status === "Interview").length,
    },
    {
      name: "Offer",
      value: jobs.filter((j) => j.status === "Offer").length,
    },
    {
      name: "Rejected",
      value: jobs.filter((j) => j.status === "Rejected").length,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Applications Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Status Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}