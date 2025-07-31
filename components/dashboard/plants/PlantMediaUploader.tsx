"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FiUpload } from "react-icons/fi";

export default function PlantMediaUploader({ plantId }: { plantId: string }) {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const timestamp = Date.now();
      const filePath = `${plantId}/${timestamp}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("plant-media")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        setError(`Upload error: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      let type: "photo" | "video" | "annotation" = "photo";
      if (file.type.startsWith("image/")) type = "photo";
      else if (file.type.startsWith("video/")) type = "video";

      const res = await fetch("/api/plants/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plantId,
          mediaUrl: filePath,
          originalName: file.name,
          fileType: file.type || "other",
          type,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(`DB insert error: ${data.error || res.statusText}`);
        setUploading(false);
        return;
      }

      setSuccess("Upload successful!");
      setFile(null);
    } catch (err) {
      setError("Unexpected error during upload");
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <div className="space-y-5">
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-future-lime px-6 py-6 hover:border-lime-500 transition-colors text-spore-grey dark:text-gray-400"
      >
        {file ? (
          <span className="text-green-900 dark:text-green-400 font-semibold">
            {file.name}
          </span>
        ) : (
          <span>Click or drag file to upload (image/video)</span>
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-future-lime to-lime-400 text-black font-semibold py-3 rounded-lg shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FiUpload className="text-lg" />
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && (
        <p className="text-red-600 dark:text-red-400 font-medium text-center">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-700 dark:text-green-400 font-medium text-center">
          {success}
        </p>
      )}
    </div>
  );
}
