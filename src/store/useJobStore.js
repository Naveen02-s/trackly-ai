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

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter(
            (job) => job.id !== id
          ),
        })),

      updateJob: (updatedJob) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === updatedJob.id
              ? updatedJob
              : job
          ),
        })),
    }),
    {
      name: "trackly-jobs",
    }
  )
);

export default useJobStore;