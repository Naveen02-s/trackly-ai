import { useState } from "react";
import AddJobModal from "../components/common/AddJobModal";
import JobRow from "../components/applications/JobRow";
import useJobStore from "../store/useJobStore";

export default function Applications() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState(null);

  const jobs = useJobStore(
    (state) => state.jobs
  );

  const [editingJob, setEditingJob] =
    useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Applications
        </h1>

        <button
          onClick={() => {
            setEditingJob(null);
            setIsModalOpen(true);
          }}
          className="
            bg-violet-600
            px-5
            py-3
            rounded-xl
            hover:bg-violet-500
            transition
          "
        >
          + Add Job
        </button>
      </div>

      {/* Search + Filter */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-6
        "
      >
        <input
          type="text"
          placeholder="Search company or role..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            flex-1
            bg-white
            dark:bg-zinc-900
            text-zinc-900
            dark:text-white
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-xl
            p-3
            placeholder:text-zinc-500
            dark:placeholder:text-zinc-400
            transition-colors
          "
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            bg-white
            dark:bg-zinc-900
            text-zinc-900
            dark:text-white
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-xl
            p-3
            transition-colors
          "
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      {filteredJobs.length > 0 ? (
        <div
          className="
            bg-white
            dark:bg-zinc-900
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-2xl
            overflow-x-auto
            transition-colors
          "
        >
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-zinc-200
                  dark:border-zinc-800
                "
              >
                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Company
                </th>

                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Role
                </th>

                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Location
                </th>

                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Status
                </th>

                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Date
                </th>

                <th className="p-4 text-left text-zinc-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <JobRow
                  key={job.id}
                  job={job}
                  onEdit={(job) => {
                    setEditingJob(job);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="
            text-center
            py-16
            text-zinc-500
            dark:text-zinc-400
            bg-white
            dark:bg-zinc-900
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-2xl
            transition-colors
          "
        >
          No applications found.
        </div>
      )}

      <AddJobModal
        isOpen={isModalOpen}
        job={editingJob}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
      />
    </div>
  );
}