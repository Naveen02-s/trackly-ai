import { useEffect, useState } from "react";
import useJobStore from "../../store/useJobStore";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function AddJobModal({
  isOpen,
  onClose,
  job,
}) {
  const addJob = useJobStore(
    (state) => state.addJob
  );

  const updateJob = useJobStore(
    (state) => state.updateJob
  );

  const [resumeBase64, setResumeBase64] =
    useState("");

  const [resumeName, setResumeName] =
    useState("");

  const [resumeText, setResumeText] =
    useState("");

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        role: job.role,
        location: job.location,
        status: job.status,
        notes: job.notes,
      });

      setResumeBase64(job.resumeBase64 || "");
      setResumeName(job.resumeName || "");
      setResumeText(job.resumeText || "");
    } else {
      setFormData({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        notes: "",
      });

      setResumeBase64("");
      setResumeName("");
      setResumeText("");
    }
  }, [job, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setResumeBase64(reader.result);
    };

    reader.readAsDataURL(file);

    setResumeName(file.name);

    const arrayBuffer =
      await file.arrayBuffer();

    const pdf =
      await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

    let text = "";

    for (
      let pageNum = 1;
      pageNum <= pdf.numPages;
      pageNum++
    ) {
      const page =
        await pdf.getPage(pageNum);

      const content =
        await page.getTextContent();

      text += content.items
        .map((item) => item.str)
        .join(" ");
    }

    setResumeText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (job) {
      updateJob({
        ...job,
        ...formData,
        resumeBase64,
        resumeName,
        resumeText,
      });
    } else {
      addJob({
        id: crypto.randomUUID(),
        ...formData,
        resumeBase64,
        resumeName,
        resumeText,
        date: new Date().toLocaleDateString(),
      });
    }

    setFormData({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      notes: "",
    });

    setResumeBase64("");
    setResumeName("");
    setResumeText("");

    onClose();
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
        z-50
      "
    >
      <div
        className="
          bg-white
          dark:bg-zinc-900
          border
          border-zinc-200
          dark:border-zinc-800
          rounded-3xl
          p-6
          w-full
          max-w-lg
          mx-4
          text-zinc-900
          dark:text-white
        "
      >
        <h2 className="text-2xl font-bold mb-6">
          {job ? "Edit Application" : "Add Job Application"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-800
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
            "
          />

          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-800
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
            "
          />

          <div>
            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-600
                dark:text-zinc-400
              "
            >
              Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="
                w-full
                bg-zinc-100
                dark:bg-zinc-800
                border
                border-zinc-300
                dark:border-zinc-700
                rounded-xl
                p-3
              "
            />

            {resumeName && (
              <p
                className="
                  mt-2
                  text-green-600
                  dark:text-green-400
                  text-sm
                "
              >
                {resumeName}
              </p>
            )}
          </div>

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-800
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
            "
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-800
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
            "
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="
              w-full
              bg-zinc-100
              dark:bg-zinc-800
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              p-3
              text-zinc-900
              dark:text-white
              placeholder:text-zinc-500
            "
          />

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-xl
                bg-zinc-200
                dark:bg-zinc-700
                hover:bg-zinc-300
                dark:hover:bg-zinc-600
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                text-white
                transition
              "
            >
              {job ? "Save Changes" : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}