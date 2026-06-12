import { Trash2 } from "lucide-react";
import useJobStore from "../../store/useJobStore";

export default function JobRow({ job }) {
  const deleteJob = useJobStore(
    (state) => state.deleteJob
  );

  const statusColors = {
    Applied:
      "bg-blue-500/20 text-blue-400",

    Interview:
      "bg-yellow-500/20 text-yellow-400",

    Offer:
      "bg-green-500/20 text-green-400",

    Rejected:
      "bg-red-500/20 text-red-400",
  };

  return (
    <tr className="border-b border-zinc-800">
      <td className="p-4">{job.company}</td>

      <td className="p-4">{job.role}</td>

      <td className="p-4">{job.location}</td>

      <td className="p-4">
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            ${statusColors[job.status]}
          `}
        >
          {job.status}
        </span>
      </td>

      <td className="p-4">{job.date}</td>

      <td className="p-4">
        <button
          onClick={() =>
            deleteJob(job.id)
          }
        >
          <Trash2
            size={18}
            className="
              text-red-400
              hover:text-red-300
            "
          />
        </button>
      </td>
    </tr>
  );
}