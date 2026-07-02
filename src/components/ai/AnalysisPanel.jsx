export default function AnalysisPanel({
  job,
  loading,
  analysis,
}) {
  return (
    <div
  className="
    sticky
    top-8
    h-[calc(100vh-4rem)]
    overflow-y-auto

    bg-zinc-900
    border
    border-zinc-800
    rounded-2xl

    p-6
    shadow-xl
  "
>
      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Career Coach
      </h2>

      {!job && (
  <div className="text-zinc-400">
    Select a job from the Kanban board.
  </div>
)}

{job && !loading && !analysis && (
  <div className="space-y-2">
    <h3 className="font-semibold">
      {job.company}
    </h3>

    <p className="text-zinc-400">
      {job.role}
    </p>

    <p className="text-zinc-500 mt-6">
      Click <strong>Analyze</strong> in the drawer to generate AI insights.
    </p>
  </div>
)}

      {loading && (
        <div className="text-zinc-400">
          Analyzing application...
        </div>
      )}

      {analysis && (
  <div className="space-y-6">

    {/* Resume Match */}
    <div>
      <h4 className="font-semibold mb-2">
        Resume Match Score
      </h4>

      <div className="flex items-center gap-3">
        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${analysis.analysis.resume_match_score}%`,
            }}
          />
        </div>

        <span className="font-bold">
          {analysis.analysis.resume_match_score}%
        </span>
      </div>
    </div>

    {/* Success Probability */}
    <div>
      <h4 className="font-semibold mb-2">
        Success Probability
      </h4>

      <div className="flex items-center gap-3">
        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className="bg-violet-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${analysis.analysis.success_probability_percent}%`,
            }}
          />
        </div>

        <span className="font-bold">
          {analysis.analysis.success_probability_percent}%
        </span>
      </div>

      <p className="text-zinc-400 mt-3 text-sm">
        {analysis.analysis.summary}
      </p>
    </div>

            {/* Strengths */}
<div>
  <h4 className="font-semibold mb-3">
    Strengths
  </h4>

  <ul className="space-y-2 text-zinc-300">
    {analysis.analysis.strengths?.map((item, index) => (
      <li
        key={index}
        className="flex gap-2"
      >
        <span>✅</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>

{/* Missing Skills */}
<div>
  <h4 className="font-semibold mb-3 text-yellow-400">
    Missing Skills
  </h4>

  <ul className="space-y-2 text-zinc-300">
    {analysis.analysis.missing_skills?.map((item, index) => (
      <li
        key={index}
        className="flex gap-2"
      >
        <span>⚡</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>

{/* ATS Improvements */}
<div>
  <h4 className="font-semibold mb-3">
    ATS Improvements
  </h4>

  <ul className="space-y-2 text-zinc-300">
    {analysis.analysis.ats_improvements?.map((item, index) => (
      <li
        key={index}
        className="flex gap-2"
      >
        <span>📄</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>

{/* Next Actions */}
<div>
  <h4 className="font-semibold mb-3">
    Next Actions
  </h4>

  <ul className="space-y-2 text-zinc-300">
    {analysis.analysis.next_actions?.map((item, index) => (
      <li
        key={index}
        className="flex gap-2"
      >
        <span>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>

{/* Risk Assessment */}
<div>
  <h4 className="font-semibold mb-3 text-red-400">
    Risk Assessment
  </h4>

  <ul className="space-y-2 text-zinc-300">
    {analysis.analysis.risk_assessment?.map((item, index) => (
      <li
        key={index}
        className="flex gap-2"
      >
        <span>⚠️</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>

  </div>
)}
    </div>
  );
}