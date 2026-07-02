import { create } from "zustand";
import { persist } from "zustand/middleware";

const useJobStore = create(
  persist(
    (set) => ({
      jobs: [],

      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),

        updateJob: (updatedJob) =>
  set((state) => ({
    jobs: state.jobs.map((job) =>
      job.id === updatedJob.id
        ? updatedJob
        : job
    ),
  })),

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),

      updateJob: (updatedJob) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job,
          ),
        })),

      updateJobStatus: (id, status) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id ? { ...job, status } : job,
          ),
        })),
    }),
    {
      name: "trackly-jobs",
    },
  ),
);

export default useJobStore;
