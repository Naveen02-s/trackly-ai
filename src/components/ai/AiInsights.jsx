import { useState } from "react";
import { analyzeJob } from "../../services/aiService";

export default function AIInsights({ job }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const generateInsights = async () => {
    setLoading(true);

    try {
      const result = await analyzeJob(job);

      const parsed = JSON.parse(result);

      setAnalysis(parsed);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze this application.");
    }

    setLoading(false);
  };

  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-xl
        p-5
        mt-6
      "
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          🤖 AI Career Coach
        </h3>

        <button
          onClick={generateInsights}
          disabled={loading}
          className="
            bg-violet-600
            hover:bg-violet-500
            disabled:opacity-60
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-zinc-400">
          Analyzing application...
        </p>
      )}

      {analysis && (
        <div className="mt-6 space-y-6">
          {/* Resume Match */}
          <div>
            <h4 className="font-semibold mb-2">
              Resume Match Score
            </h4>

            <div className="flex items-center gap-3">
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
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
                  className="bg-violet-600 h-3 rounded-full"
                  style={{
                    width: `${analysis.analysis.success_probability_percent}%`,
                  }}
                />
              </div>

              <span className="font-bold">
                {analysis.analysis.success_probability_percent}%
              </span>
            </div>

            <p className="text-zinc-400 mt-2 text-sm">
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

          {/* Interview Preparation */}
          <div>
            <h4 className="font-semibold mb-3">
              Interview Preparation
            </h4>

            <ul className="space-y-2 text-zinc-300">
              {analysis.analysis.interview_preparation?.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2"
                >
                  <span>🎤</span>
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