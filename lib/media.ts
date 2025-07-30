export function getMediaType(url: string): "video" | "photo" {
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "mkv"];
  const ext = url.split(".").pop()?.toLowerCase();
  if (ext && videoExtensions.includes(ext)) return "video";
  return "photo";
}
