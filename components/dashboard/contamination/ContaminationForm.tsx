"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ContaminationLog } from "@/lib/types";
import {
  insertContaminationLog,
  updateContaminationLog,
  uploadContaminationMedia,
} from "@/api/contamination";

interface ContaminationFormProps {
  initial?: ContaminationLog;
  onSuccess?: () => void;
  placeholderImageUrl?: string;
}

export default function ContaminationForm({
  initial,
  onSuccess,
  placeholderImageUrl,
}: ContaminationFormProps) {
  const [form, setForm] = useState({
    plant_id: "",
    type: "mold" as ContaminationLog["type"],
    issue: "",
    description: "",
    mediaFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initial) {
      setForm({
        plant_id: initial.plant_id || "",
        type: initial.type || "mold",
        issue: initial.issue || "",
        description: initial.description || "",
        mediaFile: null,
      });
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let mediaPath: string | null = initial?.media_url ?? null;

    try {
      if (form.mediaFile) {
        mediaPath = await uploadContaminationMedia(form.mediaFile);
      }

      const payload = {
        plant_id: form.plant_id,
        type: form.type,
        issue: form.issue,
        description: form.description,
        media_url: mediaPath ?? undefined,
      };

      let savedLog: ContaminationLog;

      if (initial?.id) {
        savedLog = await updateContaminationLog(initial.id, payload);
        toast.success("Contamination log updated.");
      } else {
        savedLog = await insertContaminationLog(payload);
        toast.success("Contamination logged.");
      }

      onSuccess?.();
      router.push(`/contamination/${savedLog.id}`);
    } catch (error: any) {
      console.error("Error submitting contamination log:", error);
      toast.error(error?.message || "Failed to submit contamination log.");
    } finally {
      setUploading(false);
    }
  };

  // Brand colors
  const mossShadow = "text-[#42594D]";
  const borderGray = "border-[#DAD7D2]";
  const accentGreen = "focus:ring-[#B7EF48]";
  const accentGreenBg = "bg-[#B7EF48]";
  const accentGreenBgHover = "hover:bg-[#a2db3e]";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h2 className={`text-2xl font-semibold ${mossShadow}`}>
        {initial ? "Edit Contamination Log" : "Log Contamination"}
      </h2>

      <div>
        <label
          htmlFor="plant_id"
          className={`block mb-1 font-semibold ${mossShadow}`}
        >
          Plant ID <span className="text-red-500">*</span>
        </label>
        <input
          id="plant_id"
          type="text"
          placeholder="Enter plant ID"
          value={form.plant_id}
          onChange={(e) => setForm({ ...form, plant_id: e.target.value })}
          required
          className={`w-full rounded border ${borderGray} px-3 py-2 focus:outline-none focus:ring-2 ${accentGreen} focus:border-[#42594D] transition`}
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className={`block mb-1 font-semibold ${mossShadow}`}
        >
          Type
        </label>
        <select
          id="type"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value as ContaminationLog["type"],
            })
          }
          className={`w-full rounded border ${borderGray} px-3 py-2 focus:outline-none focus:ring-2 ${accentGreen} focus:border-[#42594D] transition`}
        >
          <option value="mold">Mold</option>
          <option value="bacteria">Bacteria</option>
          <option value="hyperhydricity">Hyperhydricity</option>
          <option value="other">Other</option>
        </select>
      </div>

      {form.type !== "other" && (
        <div>
          <label
            htmlFor="issue"
            className={`block mb-1 font-semibold ${mossShadow}`}
          >
            Issue <span className="text-red-500">*</span>
          </label>
          <input
            id="issue"
            type="text"
            placeholder="Describe the issue"
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
            required
            className={`w-full rounded border ${borderGray} px-3 py-2 focus:outline-none focus:ring-2 ${accentGreen} focus:border-[#42594D] transition`}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="description"
          className={`block mb-1 font-semibold ${mossShadow}`}
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          placeholder="Additional details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className={`w-full rounded border ${borderGray} px-3 py-2 resize-y focus:outline-none focus:ring-2 ${accentGreen} focus:border-[#42594D] transition`}
        />
      </div>

      <div>
        <label
          htmlFor="mediaFile"
          className={`block mb-1 font-semibold ${mossShadow}`}
        >
          Photo / Video (optional)
        </label>
        <input
          id="mediaFile"
          type="file"
          accept="image/*,video/mp4,video/quicktime"
          onChange={(e) =>
            setForm({ ...form, mediaFile: e.target.files?.[0] ?? null })
          }
          className="block w-full text-gray-600"
        />
        {form.mediaFile ? (
          <p className="mt-2 text-sm text-gray-600">{form.mediaFile.name}</p>
        ) : placeholderImageUrl ? (
          <img
            src={placeholderImageUrl}
            alt="Placeholder"
            className="mt-2 rounded-lg max-h-48 w-full object-cover"
          />
        ) : null}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`w-full py-3 rounded-lg font-semibold text-white ${accentGreenBg} ${accentGreenBgHover} transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {uploading
          ? initial
            ? "Updating..."
            : "Logging..."
          : initial
          ? "Update Log"
          : "Submit"}
      </button>
    </form>
  );
}
