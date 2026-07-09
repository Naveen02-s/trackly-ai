import { useState, useEffect } from "react";
import useJobStore from "../../store/useJobStore";

export default function EditJobModal({
  isOpen,
  onClose,
  job,
}) {
  const updateJob =
    useJobStore(
      (state) => state.updateJob
    );

  const [formData, setFormData] =
    useState({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      notes: "",
    });

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    updateJob(formData);

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-zinc-950
          border
          border-zinc-200
          dark:border-zinc-800
          rounded-2xl
          p-6
          w-full
          max-w-lg
          text-zinc-900
          dark:text-white
          shadow-xl
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Edit Job
        </h2>

        <div className="space-y-4">
          <input
            value={formData.company}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: e.target.value,
              })
            }
            placeholder="Company"
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          />

          <input
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
            placeholder="Role"
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          />

          <input
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
            placeholder="Location"
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            rows="4"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            placeholder="Notes"
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              bg-zinc-200
              dark:bg-zinc-800
              hover:bg-zinc-300
              dark:hover:bg-zinc-700
              py-3
              rounded-xl
              transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              flex-1
              bg-violet-600
              hover:bg-violet-500
              text-white
              py-3
              rounded-xl
              transition
            "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}