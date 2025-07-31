"use client";

import Image from "next/image";
import { FiVideo } from "react-icons/fi";
import React, { useEffect, useState } from "react";

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

export default function PlantMediaGallery({
  plantId,
  useSignedUrls = true,
}: {
  plantId: string;
  useSignedUrls?: boolean;
}) {
  const [mediaLogs, setMediaLogs] = useState<PlantMediaLog[]>([]);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/plants/media-urls?plantId=${plantId}&useSignedUrls=${useSignedUrls}`
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
      } catch (e) {
        setError("Failed to load media.");
      }
      setLoading(false);
    }
    fetchMedia();
  }, [plantId, useSignedUrls]);

  if (loading) return <p>Loading media...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (mediaLogs.length === 0) return <p>No media uploaded yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mediaLogs.map((media) => {
        const url = mediaUrls[media.id];
        if (!url) return null;

        return (
          <div
            key={media.id}
            className="relative rounded overflow-hidden shadow-md group cursor-pointer"
          >
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
