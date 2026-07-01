import { useState } from "react";
import useJobStore from "../store/useJobStore";
import KanbanColumn from "../components/kanban/KanbanColumn";
import JobDrawer from "../components/kanban/JobDrawer";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";

export default function Kanban() {
  const jobs = useJobStore((state) => state.jobs);

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [activeJob, setActiveJob] =
  useState(null);

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  const updateJobStatus =
  useJobStore(
    (state) => state.updateJobStatus
  );

  const handleDragStart = (event) => {
  const job = jobs.find(
    (job) => job.id === event.active.id
  );

  setActiveJob(job);
};

  const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over) {
    setActiveJob(null);
    return;
  }

  updateJobStatus(
    active.id,
    over.id
  );

  setActiveJob(null);
};

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

      <DndContext
  collisionDetection={closestCorners}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
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
  <DragOverlay>
  {activeJob ? (
    <div
      className="
        bg-zinc-800
        border
        border-violet-500
        rounded-xl
        p-4
        shadow-2xl
        w-[250px]
        rotate-2
        opacity-95
      "
    >
      <h3 className="font-semibold">
        {activeJob.company}
      </h3>

      <p className="text-sm text-zinc-400 mt-1">
        {activeJob.role}
      </p>

      <p className="text-xs text-zinc-500 mt-3">
        {activeJob.location}
      </p>
    </div>
  ) : null}
</DragOverlay>
</DndContext>

      <JobDrawer
        job={selectedJob}
        onClose={() =>
          setSelectedJob(null)
        }
      />
    </div>
  );
}