import DayCard from "./DayCard";

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type Checkin = {
  checkin_date: string;
  video_url: string | null;
  notes: string | null;
};

export default function WeekOverview({ checkins }: { checkins: Checkin[] }) {
  // Transform the array into a lookup map
  const checkinMap = Object.fromEntries(
    checkins.map((c) => [c.checkin_date, c])
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {week.map((day, index) => {
        const isSunday = index === 6;
        return (
          <div key={day} className={isSunday ? "md:col-span-3" : ""}>
            <DayCard day={day} checkins={checkinMap} />
          </div>
        );
      })}
    </div>
  );
}
