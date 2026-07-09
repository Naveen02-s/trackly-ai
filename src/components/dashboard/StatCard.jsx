import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color = "from-violet-600 to-fuchsia-600",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900/80
        backdrop-blur-xl
        p-6
        shadow-sm
        dark:shadow-none
        transition-colors
      "
    >
      {/* Gradient Glow */}
      <div
        className={`
          absolute
          -top-12
          -right-12
          h-32
          w-32
          rounded-full
          bg-gradient-to-br
          ${color}
          opacity-20
          blur-3xl
        `}
      />

      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`
            h-12
            w-12
            rounded-xl
            bg-gradient-to-br
            ${color}
            flex
            items-center
            justify-center
            text-white
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}