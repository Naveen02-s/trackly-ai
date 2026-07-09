import StatCard from "../components/dashboard/StatCard";
import useJobStore from "../store/useJobStore";
import {
  Briefcase,
  Mic,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

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

export default function Dashboard() {
  const jobs = useJobStore((state) => state.jobs);

  const totalApplications = jobs.length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const successRate =
    totalApplications > 0
      ? Math.round((offers / totalApplications) * 100)
      : 0;

  // 📊 Trend
  const monthlyData = [
    { month: "Jan", applications: 4 },
    { month: "Feb", applications: 7 },
    { month: "Mar", applications: 5 },
    { month: "Apr", applications: 10 },
    { month: "May", applications: 8 },
    { month: "Jun", applications: totalApplications },
  ];

  const statusData = [
    {
      name: "Applied",
      value: jobs.filter(
        (j) => j.status === "Applied"
      ).length,
    },
    { name: "Interview", value: interviews },
    { name: "Offer", value: offers },
    { name: "Rejected", value: rejected },
  ];

  return (
    <div className="relative p-8">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        Welcome Back 👋
      </h1>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        Track your applications and stay on top of your job search.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mt-10">
        <StatCard
          title="Applications"
          value={totalApplications}
          icon={<Briefcase size={24} />}
          color="from-blue-500 to-cyan-500"
        />

        <StatCard
          title="Interviews"
          value={interviews}
          icon={<Mic size={24} />}
          color="from-yellow-500 to-orange-500"
        />

        <StatCard
          title="Offers"
          value={offers}
          icon={<Trophy size={24} />}
          color="from-green-500 to-emerald-500"
        />

        <StatCard
          title="Rejected"
          value={rejected}
          icon={<XCircle size={24} />}
          color="from-red-500 to-pink-500"
        />

        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={<TrendingUp size={24} />}
          color="from-violet-500 to-fuchsia-500"
        />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        {/* Line Chart */}
        <div
          className="
            bg-white
            dark:bg-white/5
            backdrop-blur-md
            border
            border-zinc-200
            dark:border-white/10
            rounded-2xl
            p-5
            shadow-lg
            transition-colors
          "
        >
          <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
            Applications Trend
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d4d4d8"
              />
              <XAxis
                dataKey="month"
                stroke="#71717a"
              />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          className="
            bg-white
            dark:bg-white/5
            backdrop-blur-md
            border
            border-zinc-200
            dark:border-white/10
            rounded-2xl
            p-5
            shadow-lg
            transition-colors
          "
        >
          <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
            Status Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d4d4d8"
              />
              <XAxis
                dataKey="name"
                stroke="#71717a"
              />
              <YAxis stroke="#71717a" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}