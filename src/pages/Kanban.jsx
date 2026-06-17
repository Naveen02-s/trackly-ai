import { useState } from "react";
import useJobStore from "../store/useJobStore";
import KanbanColumn from "../components/kanban/KanbanColumn";
import JobDrawer from "../components/kanban/JobDrawer";

export default function Kanban() {
  const jobs = useJobStore((state) => state.jobs);

  const [selectedJob, setSelectedJob] =
    useState(null);

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  return (
    <div
  className={`
    p-8
    transition-all
    duration-300

    ${
      selectedJob
        ? "lg:pr-[550px] xl:pr-[600px]"
        : ""
    }
  `}
>
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
            onJobClick={setSelectedJob}
          />
        ))}
      </div>

      <JobDrawer
        job={selectedJob}
        onClose={() =>
          setSelectedJob(null)
        }
      />
    </div>
  );
}