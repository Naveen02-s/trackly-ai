import useJobStore from "../store/useJobStore";
import KanbanColumn from "../components/kanban/KanbanColumn";

export default function Kanban() {
  const jobs = useJobStore((state) => state.jobs);

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Kanban Board
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            title={status}
            jobs={jobs.filter(
              (job) => job.status === status
            )}
          />
        ))}
      </div>
    </div>
  );
}