import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn({
  title,
  jobs,
  onJobClick,
  onAnalyze,
}) {
  const { setNodeRef } =
    useDroppable({
      id: title,
    });

  return (
    <div
      ref={setNodeRef}
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-4
        min-h-[70vh]
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-4
        "
      >
        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <span
          className="
            bg-zinc-800
            px-2
            py-1
            rounded-lg
            text-sm
          "
        >
          {jobs.length}
        </span>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <KanbanCard
  key={job.id}
  job={job}
  onClick={() =>
    onJobClick(job)
  }
  onAnalyze={onAnalyze}
/>
        ))}
      </div>
    </div>
  );
}