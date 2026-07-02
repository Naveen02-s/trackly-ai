import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import {
  GripVertical,
  MapPin,
  Calendar,
  Sparkles,
  Eye,
} from "lucide-react";

export default function KanbanCard({
  job,
  onClick,
  onAnalyze,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: job.id,
  });

  const style = transform
    ? {
        transform: `translate3d(
          ${transform.x}px,
          ${transform.y}px,
          0
        )`,
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      style={style}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
      }}
      className="
bg-zinc-900
border
border-zinc-800
rounded-2xl
p-5

hover:border-violet-500/40
hover:shadow-lg
hover:shadow-violet-500/10

transition-all
duration-300

select-none
"
    >
      <div className="flex justify-between items-start">
  <div className="flex-1 min-w-0">
    <h3 className="font-semibold text-lg truncate">
      {job.company}
    </h3>

    <p className="text-zinc-400 mt-1">
      {job.role}
    </p>
  </div>

  <div
    {...listeners}
    className="
      cursor-grab
      active:cursor-grabbing
      text-zinc-500
      hover:text-white
      transition
      p-1
    "
    onClick={(e) => e.stopPropagation()}
  >
    <GripVertical size={18} />
  </div>
</div>

<div className="mt-5 space-y-2 text-sm text-zinc-400">

  <div className="flex items-center gap-2">
    <MapPin size={15} />
    <span>{job.location}</span>
  </div>

  <div className="flex items-center gap-2">
    <Calendar size={15} />
    <span>{job.date}</span>
  </div>

</div>

<div className="mt-6 flex gap-3">

  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="
      flex-1
      border
      border-zinc-700
      rounded-lg
      py-2.5
      flex
      items-center
      justify-center
      gap-2
      hover:bg-zinc-700
      transition
    "
  >
    <Eye size={16} />
    View
  </button>

  <button
    onClick={(e) => {
      e.stopPropagation();
      onAnalyze(job);
    }}
    className="
      flex-1
      bg-violet-600
      hover:bg-violet-500
      rounded-lg
      py-2.5
      flex
      items-center
      justify-center
      gap-2
      transition
    "
  >
    <Sparkles size={16} />
    Analyze
  </button>

</div>
    </motion.div>
  );
}