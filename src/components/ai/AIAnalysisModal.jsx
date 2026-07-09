import { useEffect, useRef, useState } from "react";
import { X, Sparkles } from "lucide-react";
import {
  analyzeJob,
  askFollowUp,
} from "../../services/aiService";

export default function AIAnalysisModal({
  job,
  isOpen,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [followUp, setFollowUp] = useState("");
  const [messages, setMessages] = useState([]);

  const latestAIMessageRef = useRef(null);

  const generateAnalysis = async () => {
    setAnalysis(null);
    setLoading(true);

    try {
      const result = await analyzeJob(job);
      setAnalysis(JSON.parse(result));
    } catch (err) {
      console.error(err);
      alert("Failed to analyze.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim() || !analysis) return;

    const userQuestion = followUp;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setFollowUp("");
    setLoading(true);

    try {
      const reply = await askFollowUp(
        analysis,
        userQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠️ Gemini is currently busy. Please try again in a few seconds.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && job) {
      generateAnalysis();
    }
  }, [isOpen, job?.id]);

  useEffect(() => {
    if (!isOpen) {
      setAnalysis(null);
      setFollowUp("");
      setMessages([]);
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const lastMessage =
      messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.role === "assistant"
    ) {
      latestAIMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  if (!isOpen || !job) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        bg-black/60
        dark:bg-black/70
        flex
        items-center
        justify-center
        p-4
        z-[100]
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          dark:bg-zinc-900
          text-zinc-900
          dark:text-white
          rounded-2xl
          border
          border-zinc-200
          dark:border-zinc-800
          w-full
          max-w-5xl
          h-[95vh]
          flex
          flex-col
        "
      >
        {/* Header */}

        <div
          className="
            p-6
            border-b
            border-zinc-200
            dark:border-zinc-800
            flex
            justify-between
            items-center
          "
        >
          <div className="flex items-center gap-3">
            <Sparkles className="text-violet-500" />

            <div>
              <h2 className="text-xl font-bold">
                AI Career Coach
              </h2>

              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <p>{job.company}</p>
                <p>{job.role}</p>
                <p>{job.location}</p>
              </div>
            </div>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              Analyzing application...
            </p>
          ) : (
            analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Resume Match */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-2">
                    Resume Match Score
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="w-full h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full">
                      <div
                        className="h-3 bg-green-500 rounded-full"
                        style={{
                          width: `${analysis.analysis.resume_match_score}%`,
                        }}
                      />
                    </div>

                    <span className="font-bold">
                      {
                        analysis.analysis
                          .resume_match_score
                      }
                      %
                    </span>
                  </div>
                </div>

                {/* Success Probability */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-2">
                    Success Probability
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="w-full h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full">
                      <div
                        className="h-3 bg-violet-500 rounded-full"
                        style={{
                          width: `${analysis.analysis.success_probability_percent}%`,
                        }}
                      />
                    </div>

                    <span className="font-bold">
                      {
                        analysis.analysis
                          .success_probability_percent
                      }
                      %
                    </span>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 mt-3">
                    {analysis.analysis.summary}
                  </p>
                </div>

                {/* Strengths */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3">
                    Strengths
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.strengths?.map(
                      (item, index) => (
                        <li key={index}>
                          ✅ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Missing Skills */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3 text-yellow-500">
                    Missing Skills
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.missing_skills?.map(
                      (item, index) => (
                        <li key={index}>
                          ⚡ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                                {/* ATS */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3">
                    ATS Improvements
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.ats_improvements?.map(
                      (item, index) => (
                        <li key={index}>
                          📄 {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Next Actions */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3">
                    Next Actions
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.next_actions?.map(
                      (item, index) => (
                        <li key={index}>
                          🎯 {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Interview */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3">
                    Interview Preparation
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.interview_preparation?.map(
                      (item, index) => (
                        <li key={index}>
                          🎤 {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Risk */}

                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5">
                  <h3 className="font-semibold mb-3 text-red-500">
                    Risk Assessment
                  </h3>

                  <ul className="space-y-2">
                    {analysis.analysis.risk_assessment?.map(
                      (item, index) => (
                        <li key={index}>
                          ⚠️ {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

              </div>
            )
          )}

          <>
            {messages.length > 0 && (
              <div className="mt-8 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    ref={
                      index === messages.length - 1 &&
                      message.role === "assistant"
                        ? latestAIMessageRef
                        : null
                    }
                    className={
                      message.role === "user"
                        ? "bg-violet-600 text-white rounded-xl p-4 ml-auto max-w-[80%]"
                        : "bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 mr-auto max-w-[80%]"
                    }
                  >
                    <p className="whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {loading && analysis && (
              <div className="mt-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 max-w-[80%]">
                  AI is thinking...
                </div>
              </div>
            )}
          </>
        </div>

        {/* Bottom */}

        <div
          className="
            border-t
            border-zinc-200
            dark:border-zinc-800
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              bg-zinc-100
              dark:bg-zinc-800
              rounded-xl
              px-4
            "
          >
            <input
              value={followUp}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFollowUp();
                }
              }}
              onChange={(e) =>
                setFollowUp(e.target.value)
              }
              placeholder="Ask a follow up..."
              className="
                flex-1
                bg-transparent
                text-zinc-900
                dark:text-white
                placeholder:text-zinc-500
                dark:placeholder:text-zinc-400
                py-3
                outline-none
              "
            />

            <button
              onClick={handleFollowUp}
              disabled={loading}
              className="
                text-violet-500
                hover:text-violet-400
                disabled:opacity-50
                px-3
              "
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}