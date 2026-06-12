import { useState } from "react";
import useJobStore from "../../store/useJobStore";

export default function AddJobModal({
  isOpen,
  onClose,
}) {
  const addJob = useJobStore(
    (state) => state.addJob
  );

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addJob({
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
    });

    setFormData({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      notes: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-6
          w-full
          max-w-lg
          mx-4
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          Add Job Application
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-xl p-3"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-xl
                bg-zinc-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                rounded-xl
                bg-violet-600
              "
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}