import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
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
        You are 2 interviews away from your next offer.
      </p>

      <div
        className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6
            mt-10"
      >
        <StatCard title="Applications" value="47" />

        <StatCard title="Interviews" value="9" />

        <StatCard title="Offers" value="2" />

        <StatCard title="Rejected" value="12" />
      </div>
    </div>
  );
}
