import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn({
  title,
  jobs,
  onJobClick,
  onAnalyze,
}) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className="
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-200
        dark:border-zinc-800
        rounded-2xl
        p-4
        min-h-[250px]
        shadow-sm
        dark:shadow-none
        transition-colors
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
        <h2 className="font-bold text-lg text-zinc-900 dark:text-white">
          {title}
        </h2>

        <span
          className="
            bg-zinc-100
            dark:bg-zinc-800
            text-zinc-700
            dark:text-zinc-300
            px-2
            py-1
            rounded-lg
            text-sm
            transition-colors
          "
        >
          {jobs.length}
        </span>
      </div>

      <div className="space-y-5">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <KanbanCard
              key={job.id}
              job={job}
              onClick={() => onJobClick(job)}
              onAnalyze={onAnalyze}
            />
          ))
        ) : (
          <div className="py-10 text-center text-zinc-500 dark:text-zinc-500 text-sm">
            No applications
          </div>
        )}
      </div>
    </div>
  );
}