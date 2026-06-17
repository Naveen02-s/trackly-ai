import {
    X,
    MapPin,
    Calendar,
    Briefcase,
} from "lucide-react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import useJobStore from "../../store/useJobStore";
import { useState } from "react";
import EditJobModal from "../common/EditJobModal";

export default function JobDrawer({
    job,
    onClose,
}) {
    const deleteJob = useJobStore(
        (state) => state.deleteJob
    );
    const [editOpen, setEditOpen] =
        useState(false);

    return (
        <AnimatePresence>
            {job && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              z-40
            "
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 220,
                        }}
                        className="
              fixed
              top-0
              right-0
              h-screen

              w-full
              sm:w-[450px]
              md:w-[500px]
              lg:w-[550px]
              xl:w-[600px]

              bg-zinc-950
              border-l
              border-zinc-800

              z-50
              overflow-y-auto
              shadow-2xl
            "
                    >
                        {/* Header */}
                        <div
                            className="
                sticky
                top-0
                bg-zinc-950
                border-b
                border-zinc-800
                p-6
                flex
                justify-between
                items-center
              "
                        >
                            <h2 className="text-2xl font-bold">
                                Job Details
                            </h2>

                            <button
                                onClick={onClose}
                                className="
                  p-2
                  rounded-lg
                  hover:bg-zinc-800
                  transition
                "
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {job.company ||
                                        "Unknown Company"}
                                </h1>

                                <p className="text-zinc-400 mt-2">
                                    {job.role ||
                                        "Role not specified"}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} />
                                    <span>
                                        {job.location ||
                                            "Location not provided"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Briefcase size={18} />
                                    <span>
                                        {job.status ||
                                            "Status not assigned"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar size={18} />
                                    <span>
                                        {job.date ||
                                            "Date not available"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3
                                    className="
                    text-lg
                    font-semibold
                    mb-3
                  "
                                >
                                    Notes
                                </h3>

                                <div
                                    className="
                    bg-zinc-900
                    border
                    border-zinc-800
                    rounded-xl
                    p-4
                    min-h-[120px]
                    text-zinc-400
                  "
                                >
                                    {job.notes?.trim()
                                        ? job.notes
                                        : "No notes added yet."}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-10">
                                <button
                                    onClick={() =>
                                        setEditOpen(true)
                                    }
                                    className="
                    flex-1
                    bg-violet-600
                    hover:bg-violet-500
                    py-3
                    rounded-xl
                    font-medium
                    transition
                  "
                                >
                                    Edit Job
                                </button>

                                <button
                                    onClick={() => {
                                        deleteJob(job.id);
                                        onClose();
                                    }}
                                    className="
                    flex-1
                    bg-red-600
                    hover:bg-red-500
                    py-3
                    rounded-xl
                    font-medium
                    transition
                  "
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
            <EditJobModal
  isOpen={editOpen}
  onClose={() =>
    setEditOpen(false)
  }
  job={job}
/>
        </AnimatePresence>
    );
}