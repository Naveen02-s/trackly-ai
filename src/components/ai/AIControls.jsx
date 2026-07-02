export default function AIControls({
  onAnalyze,
  loading,
}) {
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
        <h3 className="text-lg font-semibold">
          🤖 AI Career Coach
        </h3>

        <button
          onClick={onAnalyze}
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
    </div>
  );
}