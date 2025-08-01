"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PlantMediaUploader({
  plantId,
  userId,
  onUploaded,
}: {
  plantId: string;
  userId: string;
  onUploaded?: () => void; // Callback to trigger refresh
}) {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const timestamp = Date.now();
      const filePath = `${userId}/${plantId}/${timestamp}-${file.name}`;
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to upload");
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("plant-media")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        toast.error(`Upload error: ${uploadError.message}`);
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
          uploadedBy: user?.id || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(`DB insert error: ${data.error || res.statusText}`);
        setUploading(false);
        return;
      }

      toast.success("Upload successful!");

      // Reset the file input
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Trigger gallery refresh
      if (onUploaded) {
        onUploaded();
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error during upload");
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
          ref={fileInputRef}
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
    </div>
  );
}
