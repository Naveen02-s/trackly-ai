import { useState } from "react";
import useJobStore from "../store/useJobStore";
import KanbanColumn from "../components/kanban/KanbanColumn";
import JobDrawer from "../components/kanban/JobDrawer";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { analyzeJob } from "../services/aiService";
import AIAnalysisModal from "../components/ai/AIAnalysisModal";

export default function Kanban() {
  const jobs = useJobStore((state) => state.jobs);

  const [selectedJob, setSelectedJob] =
    useState(null);

const handleSelectJob = (job) => {
  setSelectedJob(job);
  setAnalysis(null);
};
  const [analysis, setAnalysis] =
    useState(null);

const [loading, setLoading] =
  useState(false);

const generateInsights = async () => {
  if (!selectedJob) return;

  // Clear previous analysis immediately
  setAnalysis(null);

  setLoading(true);

  try {
    const result = await analyzeJob(selectedJob);

    const parsed = JSON.parse(result);

    setAnalysis(parsed);
  } catch (error) {
    console.error(error);
    alert("Failed to analyze this application.");
  } finally {
    setLoading(false);
  }
};

  const [activeJob, setActiveJob] =
  useState(null);

  const [analysisJob, setAnalysisJob] =
  useState(null);

const [analysisOpen, setAnalysisOpen] =
  useState(false);

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  const updateJobStatus =
  useJobStore(
    (state) => state.updateJobStatus
  );

  const handleDragStart = (event) => {
  const job = jobs.find(
    (job) => job.id === event.active.id
  );

  setActiveJob(job);
};

  const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over) {
    setActiveJob(null);
    return;
  }

  updateJobStatus(
    active.id,
    over.id
  );

  setActiveJob(null);
};

const handleAnalyze = (job) => {
  setAnalysisJob(job);
  setAnalysisOpen(true);
};

  return (
    <div
  className="
    w-full
    p-6
    lg:p-8
  "
>
      <h1 className="text-4xl font-bold mb-8">
        Kanban Board
      </h1>

      <DndContext
  collisionDetection={closestCorners}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>

  {/* Kanban */}
    <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  2xl:grid-cols-4
  gap-8
"
>
      {statuses.map((status) => (
        <KanbanColumn
  key={status}
  title={status}
  jobs={jobs.filter(
    (job) => job.status === status
  )}
  onJobClick={setSelectedJob}
  onAnalyze={handleAnalyze}
/>
      ))}
    </div>

  <DragOverlay>
  {activeJob ? (
    <div
      className="
        bg-zinc-800
        border
        border-violet-500
        rounded-xl
        p-4
        shadow-2xl
        w-[250px]
        rotate-2
        opacity-95
      "
    >
      <h3 className="font-semibold">
        {activeJob.company}
      </h3>

      <p className="text-sm text-zinc-400 mt-1">
        {activeJob.role}
      </p>

      <p className="text-xs text-zinc-500 mt-3">
        {activeJob.location}
      </p>
    </div>
  ) : null}
</DragOverlay>
</DndContext>

      <JobDrawer
  job={selectedJob}
  onClose={() => setSelectedJob(null)}
  onAnalyze={generateInsights}
  loading={loading}
/>

<AIAnalysisModal
  job={analysisJob}
  isOpen={analysisOpen}
  onClose={() => {
    setAnalysisOpen(false);
    setAnalysisJob(null);
  }}
/>
    </div>
  );
}