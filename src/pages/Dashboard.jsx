import StatCard from "../components/dashboard/StatCard";
import useJobStore from "../store/useJobStore";

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

  return (
    <div className="relative p-8">
      <div
        className="
          absolute
          top-0
          right-0
          h-96
          w-96
          bg-violet-600/20
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <h1
        className="
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
        "
      >
        Welcome Back 👋
      </h1>

      <p className="text-zinc-400 mt-2">
        Track your applications and stay on top of your job search.
      </p>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-6
          mt-10
        "
      >
        <StatCard
          title="Applications"
          value={totalApplications}
        />

        <StatCard
          title="Interviews"
          value={interviews}
        />

        <StatCard
          title="Offers"
          value={offers}
        />

        <StatCard
          title="Rejected"
          value={rejected}
        />

        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
        />
      </div>
    </div>
  );
}