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
  bg-zinc-900/70
  backdrop-blur
  border
  border-zinc-800
  rounded-3xl
  p-6
  shadow-lg
  hover:border-violet-500/50
  transition-all
  duration-300
"
    >
      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </motion.div>
  );
}