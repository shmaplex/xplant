"use client";

import Image from "next/image";
import { FiVideo, FiTrash2 } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
}

const BASE_MEDIA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export default function PlantMediaGallery({
  plantId,
  useSignedUrls = true,
}: PlantMediaGalleryProps) {
  const [mediaLogs, setMediaLogs] = useState<PlantMediaLog[]>([]);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMediaLogs = async () => {
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
  };

  useEffect(() => {
    fetchMediaLogs();
  }, [plantId, useSignedUrls]);

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
        toast.error(json.error || "Failed to delete media.");
      } else {
        toast.success(json.message || "Media deleted successfully.");

        // Optimistically update state instead of re-fetching
        setMediaLogs((logs) => logs.filter((m) => m.id !== mediaId));
        setMediaUrls((urls) => {
          const copy = { ...urls };
          delete copy[mediaId];
          return copy;
        });
      }
    } catch {
      setError("Failed to delete media.");
      toast.error("Failed to delete media.");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    fetchMediaLogs();

    const handleRefresh = () => fetchMediaLogs();
    window.addEventListener("refreshGallery", handleRefresh);
    return () => window.removeEventListener("refreshGallery", handleRefresh);
  }, [plantId, useSignedUrls]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-12 text-moss-shadow">
        <div className="w-12 h-12 border-4 border-future-lime border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold">Loading media...</p>
      </div>
    );

  if (error) return <p className="text-red-600">{error}</p>;
  if (mediaLogs.length === 0)
    return <p className="text-black">No media uploaded yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaLogs.map((media) => {
        const url =
          mediaUrls[media.id] ||
          (media.media_url
            ? `${BASE_MEDIA_URL.replace(/\/$/, "")}/${media.media_url}`
            : null);

        if (!url) return null;

        return (
          <div
            key={media.id}
            className={`relative rounded overflow-hidden shadow-md group cursor-pointer ${
              media.type === "video" ? "aspect-video" : ""
            } ${deletingId === media.id ? "animate-pulse opacity-70" : ""}`}
          >
            <button
              onClick={() => handleDelete(media.id, media.media_url)}
              disabled={deletingId === media.id}
              className="absolute top-2 right-2 z-10 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition"
              title="Delete media"
              aria-label="Delete media"
            >
              {deletingId === media.id ? (
                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
              ) : (
                <FiTrash2 className="w-5 h-5" />
              )}
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
