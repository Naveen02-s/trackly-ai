import { motion } from "framer-motion";

export default function KanbanCard({
  job,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className="
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-4
        cursor-pointer
      "
    >
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