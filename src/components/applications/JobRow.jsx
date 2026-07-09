import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import useJobStore from "../../store/useJobStore";

export default function JobRow({
  job,
  onEdit,
}) {
  const deleteJob = useJobStore(
    (state) => state.deleteJob
  );

  const [showDelete, setShowDelete] =
    useState(false);

  const statusColors = {
    Applied:
      "bg-blue-500/20 text-blue-500 dark:text-blue-400",

    Interview:
      "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",

    Offer:
      "bg-green-500/20 text-green-600 dark:text-green-400",

    Rejected:
      "bg-red-500/20 text-red-600 dark:text-red-400",
  };

  return (
    <>
      <tr
        className="
          border-b
          border-zinc-200
          dark:border-zinc-800
          text-zinc-900
          dark:text-white
          transition-colors
        "
      >
        <td className="p-4">
          {job.company}
        </td>

        <td className="p-4">
          {job.role}
        </td>

        <td className="p-4 text-zinc-600 dark:text-zinc-400">
          {job.location}
        </td>

        <td className="p-4">
          <span
            className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${statusColors[job.status]}
            `}
          >
            {job.status}
          </span>
        </td>

        <td className="p-4 text-zinc-600 dark:text-zinc-400">
          {job.date}
        </td>

        <td className="p-4">
          <div className="flex gap-4">
            <button
              onClick={() => onEdit(job)}
            >
              <Pencil
                size={18}
                className="
                  text-blue-500
                  dark:text-blue-400
                  hover:text-blue-600
                  dark:hover:text-blue-300
                  transition-colors
                "
              />
            </button>

            <button
              onClick={() =>
                setShowDelete(true)
              }
            >
              <Trash2
                size={18}
                className="
                  text-red-500
                  dark:text-red-400
                  hover:text-red-600
                  dark:hover:text-red-300
                  transition-colors
                "
              />
            </button>
          </div>
        </td>
      </tr>

      {showDelete && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
          "
        >
          <div
            className="
              bg-white
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              rounded-2xl
              p-6
              w-full
              max-w-md
              mx-4
              transition-colors
            "
          >
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Delete Application?
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 mt-3">
              Are you sure you want to delete
              this application?
            </p>

            <div className="mt-4">
              <p className="font-semibold text-zinc-900 dark:text-white">
                {job.company}
              </p>

              <p className="text-zinc-600 dark:text-zinc-400">
                {job.role}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() =>
                  setShowDelete(false)
                }
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-zinc-200
                  hover:bg-zinc-300
                  dark:bg-zinc-800
                  dark:hover:bg-zinc-700
                  text-zinc-900
                  dark:text-white
                  transition-colors
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteJob(job.id);
                  setShowDelete(false);
                }}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-500
                  text-white
                  transition-colors
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}