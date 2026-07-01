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
import { useState } from "react";

import useJobStore from "../../store/useJobStore";
import EditJobModal from "../common/EditJobModal";
import AiInsights from "../ai/AiInsights";
import ResumeUploadModal from "../resume/ResumeUploadModal";

export default function JobDrawer({
  job,
  onClose,
}) {
  const jobs = useJobStore(
    (state) => state.jobs
  );

  // Always use the latest job from the store
  const currentJob =
    jobs.find((j) => j.id === job?.id) || job;

  const updateJob = useJobStore(
    (state) => state.updateJob
  );

  const deleteJob = useJobStore(
    (state) => state.deleteJob
  );

  const [editOpen, setEditOpen] =
    useState(false);

  const [resumeModal, setResumeModal] =
    useState(false);

  const deleteResume = () => {
    updateJob({
      ...currentJob,
      resumeName: "",
      resumeBase64: "",
      resumeText: "",
    });
  };

  return (
    <>
      <AnimatePresence>
        {currentJob && (
          <motion.div key={currentJob.id}>
            {/* Overlay */}
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

            {/* Drawer */}
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
                    {currentJob.company ||
                      "Unknown Company"}
                  </h1>

                  <p className="text-zinc-400 mt-2">
                    {currentJob.role ||
                      "Role not specified"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>
                      {currentJob.location ||
                        "Location not provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase size={18} />
                    <span>
                      {currentJob.status ||
                        "Status not assigned"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} />
                    <span>
                      {currentJob.date ||
                        "Date not available"}
                    </span>
                  </div>
                </div>

                {/* Notes */}

                <div>
                  <h3 className="text-lg font-semibold mb-3">
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
                    {currentJob.notes?.trim()
                      ? currentJob.notes
                      : "No notes added yet."}
                  </div>
                </div>

                {/* Resume */}

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Resume
                  </h3>

                  {currentJob.resumeName ? (
                    <div
                      className="
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-xl
                        p-4
                      "
                    >
                      <p className="font-medium">
                        {currentJob.resumeName}
                      </p>

                      <div className="flex gap-3 mt-4">
  <button
    onClick={() =>
      setResumeModal(true)
    }
    className="
      flex-1
      bg-violet-600
      hover:bg-violet-500
      px-4
      py-2
      rounded-lg
      transition
    "
  >
    Replace
  </button>

  <button
    onClick={deleteResume}
    className="
      flex-1
      bg-red-600
      hover:bg-red-500
      px-4
      py-2
      rounded-lg
      transition
    "
  >
    Delete
  </button>
</div>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setResumeModal(true)
                      }
                      className="
                        bg-violet-600
                        px-4
                        py-3
                        rounded-xl
                      "
                    >
                      Upload Resume
                    </button>
                  )}
                </div>

                {/* AI */}

                <AiInsights job={currentJob} />

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
                      deleteJob(currentJob.id);
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
          </motion.div>
        )}
      </AnimatePresence>

      <EditJobModal
        isOpen={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        job={currentJob}
      />

      <ResumeUploadModal
        isOpen={resumeModal}
        onClose={() =>
          setResumeModal(false)
        }
        job={currentJob}
      />
    </>
  );
}