export function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Seoul", // force KST
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export function formatDateSafe(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString();
}

export function getCurrentMonday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday (0)
  return new Date(now.setDate(diff));
}

export function getCurrentWeekRange(): { start: Date; end: Date } {
  const monday = getCurrentMonday();
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6); // add 6 days to get Sunday
  return { start: monday, end: sunday };
}

export function getWeekDays(): string[] {
  const start = getCurrentMonday();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });
}
