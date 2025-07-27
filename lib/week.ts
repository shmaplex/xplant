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

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getWeekDays(): string[] {
  const start = getCurrentMonday();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  });
}
