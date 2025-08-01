"use client";

import Image from "next/image";
import { FiVideo, FiTrash2 } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PlantMediaLog {
  id: string;
  media_url: string;
  original_name: string;
  type: "photo" | "video" | string;
  created_at: string;
}

interface MediaResponse {
  mediaLogs: PlantMediaLog[];
  mediaUrls: Record<string, string>;
  error?: string;
}

interface PlantMediaGalleryProps {
  plantId: string;
  useSignedUrls?: boolean;
  mediaLogs?: PlantMediaLog[];
  mediaUrls?: Record<string, string>;
  onRefresh?: () => Promise<void>;
}

const BASE_MEDIA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export default function PlantMediaGallery({
  plantId,
  useSignedUrls = true,
  mediaLogs: controlledMediaLogs,
  mediaUrls: controlledMediaUrls,
  onRefresh,
}: PlantMediaGalleryProps) {
  const [mediaLogs, setMediaLogs] = useState<PlantMediaLog[]>(
    controlledMediaLogs || []
  );
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>(
    controlledMediaUrls || {}
  );
  const [loading, setLoading] = useState(!controlledMediaLogs);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (controlledMediaLogs) setMediaLogs(controlledMediaLogs);
  }, [controlledMediaLogs]);

  useEffect(() => {
    if (controlledMediaUrls) setMediaUrls(controlledMediaUrls);
  }, [controlledMediaUrls]);

  useEffect(() => {
    if (controlledMediaLogs) return;

    async function fetchMedia() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/plants/${plantId}/media?useSignedUrls=${useSignedUrls}`
        );
        const json: MediaResponse = await res.json();
        if (!res.ok || json.error) {
          setError(json.error || "Failed to load media.");
          setMediaLogs([]);
          setMediaUrls({});
        } else {
          setMediaLogs(json.mediaLogs);
          setMediaUrls(json.mediaUrls);
        }
      } catch {
        setError("Failed to load media.");
      }
      setLoading(false);
    }
    fetchMedia();
  }, [plantId, useSignedUrls, controlledMediaLogs]);

  async function handleDelete(mediaId: string, mediaUrl: string) {
    if (!confirm("Are you sure you want to delete this media?")) return;
    setDeletingId(mediaId);
    setError("");

    try {
      const res = await fetch(`/api/plants/${plantId}/media/${mediaId}`, {
        method: "DELETE",
        body: JSON.stringify({ mediaUrl }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to delete media.");
        toast.error(json.error || "Failed to delete media."); // toast error
      } else {
        toast.success(json.message || "Media deleted successfully."); // toast success

        if (onRefresh) {
          await onRefresh();
        } else {
          setMediaLogs((logs) => logs.filter((m) => m.id !== mediaId));
          setMediaUrls((urls) => {
            const copy = { ...urls };
            delete copy[mediaId];
            return copy;
          });
        }
      }
    } catch {
      setError("Failed to delete media.");
      toast.error("Failed to delete media."); // toast error
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p>Loading media...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (mediaLogs.length === 0)
    return <p className="text-black">No media uploaded yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaLogs.map((media) => {
        // Use mediaUrls[media.id], fallback to constructed URL from media_url
        const url =
          mediaUrls[media.id] ||
          (media.media_url
            ? `${BASE_MEDIA_URL.replace(/\/$/, "")}/${media.media_url}`
            : null);

        if (!url) return null;

        return (
          <div
            key={media.id}
            className="relative rounded overflow-hidden shadow-md group cursor-pointer"
          >
            <button
              onClick={() => handleDelete(media.id, media.media_url)}
              disabled={deletingId === media.id}
              className="absolute top-2 right-2 z-10 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition"
              title="Delete media"
              aria-label="Delete media"
            >
              {deletingId === media.id ? "..." : <FiTrash2 />}
            </button>

            {media.type === "photo" ? (
              <Image
                src={url}
                alt={media.original_name}
                width={300}
                height={200}
                className="object-cover w-full h-40"
                loading="lazy"
              />
            ) : (
              <div className="relative w-full h-40 bg-black flex items-center justify-center">
                <video
                  src={url}
                  className="object-cover w-full h-full"
                  controls
                />
                <FiVideo className="absolute top-2 right-2 text-white text-xl" />
              </div>
            )}

            <div className="p-2 bg-white">
              <p className="truncate text-sm font-medium">
                {media.original_name}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(media.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
