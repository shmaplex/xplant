"use client";

import Image from "next/image";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ContaminationMediaProps {
  src?: string;
  type: "photo" | "video";
  alt?: string;
  placeholderSrc?: string;
}

const supabase = createClient();

export default function ContaminationMedia({
  src,
  type,
  alt = "Contamination media",
  placeholderSrc = "/png/placeholder-contamination.png",
}: ContaminationMediaProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    async function getSignedUrl() {
      if (!src) {
        setSignedUrl(null);
        return;
      }

      // Clean path from leading slashes
      const path = src.replace(/^\/+/, "");

      const { data, error } = await supabase.storage
        .from("contamination-media")
        .createSignedUrl(path, 60 * 60); // 1 hour expiry

      if (error) {
        console.error("Error creating signed URL:", error);
        setSignedUrl(null);
      } else {
        setSignedUrl(data?.signedUrl ?? null);
      }
    }

    getSignedUrl();
  }, [src]);

  useEffect(() => {
    if (signedUrl && typeof ReactPlayer.canPlay === "function") {
      setCanPlay(ReactPlayer.canPlay(signedUrl));
    } else {
      setCanPlay(true);
    }
  }, [signedUrl]);

  // Show placeholder if no src or no signed URL
  if (!src || !signedUrl) {
    return (
      <div className="relative rounded-xl aspect-square w-full overflow-hidden">
        <Image
          src={placeholderSrc}
          alt="Placeholder contamination media"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
      </div>
    );
  }

  if (type === "video") {
    if (!canPlay) {
      return (
        <div className="rounded-xl max-h-48 w-full p-4 bg-red-100 text-red-700 text-center font-semibold">
          Sorry, this video format is not supported or cannot be played.
        </div>
      );
    }

    return (
      <div className="rounded-xl overflow-hidden" style={{ maxHeight: 192 }}>
        <ReactPlayer
          src={signedUrl}
          controls
          width="100%"
          height="100%"
          style={{ maxHeight: "192px", borderRadius: "1rem" }}
          playsInline={true}
        />
      </div>
    );
  }

  // Photo fallback
  return (
    <div className="relative rounded-xl max-h-48 w-full overflow-hidden">
      <Image
        src={signedUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
        priority={false}
      />
    </div>
  );
}
