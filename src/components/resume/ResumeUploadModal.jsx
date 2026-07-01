import { useState } from "react";
import useJobStore from "../../store/useJobStore";

export default function ResumeUploadModal({
  isOpen,
  onClose,
  job,
}) {
  const updateJob = useJobStore(
    (state) => state.updateJob
  );

  const [loading, setLoading] =
    useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !job) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = () => {
      updateJob({
        ...job,
        resumeName: file.name,
        resumeBase64: reader.result,
        resumeText:
          "Resume uploaded successfully.",
      });

      setLoading(false);
      onClose();
    };

    reader.onerror = () => {
      setLoading(false);
      alert("Failed to upload resume.");
    };

    reader.readAsDataURL(file);
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
        z-[100]
      "
    >
      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
          w-full
          max-w-md
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          {job?.resumeName
            ? "Replace Resume"
            : "Upload Resume"}
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="
            w-full
            bg-zinc-800
            rounded-xl
            p-3
          "
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              flex-1
              bg-zinc-700
              py-3
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="
              flex-1
              bg-violet-600
              py-3
              rounded-xl
              disabled:opacity-50
            "
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}