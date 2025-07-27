const VALID_VIDEO_MIN_DURATION: number = (process.env
  .VALID_VIDEO_MIN_DURATION || 90) as number; // Minimum duration in seconds for valid videos

export async function fetchLatestVideoId(): Promise<string | null> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    console.error("Missing YouTube API credentials");
    return null;
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`;

  try {
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    const searchData = await searchRes.json();

    if (!searchData?.items || !Array.isArray(searchData.items)) return null;

    // Get video IDs from search results (only video kind)
    const videoIds = searchData.items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => item.id.videoId)
      .join(",");

    if (!videoIds) return null;

    // Fetch video details to get durations
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`;
    const videosRes = await fetch(videosUrl, { next: { revalidate: 3600 } });
    const videosData = await videosRes.json();

    if (!videosData?.items || !Array.isArray(videosData.items)) return null;

    // Helper to parse ISO 8601 duration to seconds
    function parseDuration(duration: string): number {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

      const hours = match?.[1] ? parseInt(match[1].replace("H", "")) : 0;
      const minutes = match?.[2] ? parseInt(match[2].replace("M", "")) : 0;
      const seconds = match?.[3] ? parseInt(match[3].replace("S", "")) : 0;

      return hours * 3600 + minutes * 60 + seconds;
    }

    // Filter out videos shorter than 60 seconds (likely Shorts)
    const validVideos = videosData.items.filter((video: any) => {
      const durationSeconds = parseDuration(video.contentDetails.duration);
      return durationSeconds >= VALID_VIDEO_MIN_DURATION;
    });

    if (validVideos.length === 0) return null;

    // Return the newest video id (assuming videosData.items are in same order)
    return validVideos[0].id;
  } catch (error) {
    console.error("Error fetching latest YouTube video:", error);
    return null;
  }
}
