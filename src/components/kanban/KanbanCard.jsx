import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export default function KanbanCard({
  job,
  onClick,
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
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-4
        select-none
        cursor-pointer
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">
            {job.company}
          </h3>

          <p
            className="
              text-sm
              text-zinc-400
              mt-1
            "
          >
            {job.role}
          </p>
        </div>

        {/* Drag Handle */}
        <div
          {...listeners}
          className="
            cursor-grab
            active:cursor-grabbing
            text-zinc-500
            hover:text-zinc-300
            p-1
          "
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <GripVertical size={18} />
        </div>
      </div>

      <p
        className="
          text-xs
          text-zinc-500
          mt-3
        "
      >
        {job.location}
      </p>
    </motion.div>
  );
}