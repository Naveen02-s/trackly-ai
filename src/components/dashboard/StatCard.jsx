import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        bg-zinc-900/80
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >
      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </motion.div>
  );
}