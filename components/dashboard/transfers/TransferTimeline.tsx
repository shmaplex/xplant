import type { PlantTransfer } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type TimelinePoint = {
  date: string;
  plant: string;
  transferCycle: number;
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    const point = payload[0].payload as TimelinePoint;
    return (
      <div className="rounded-xl shadow-md bg-white p-3 border border-gray-100 text-sm">
        <p className="font-semibold text-moss-shadow mb-1">{point.plant}</p>
        <p className="text-gray-600">
          <span className="font-medium">Date:</span> {label}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Cycle:</span> {point.transferCycle}
        </p>
      </div>
    );
  }
  return null;
}

export default function TransferTimeline({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  const timelineData: TimelinePoint[] = transfers.map((t) => ({
    date: new Date(t.transfer_date).toLocaleDateString("en-US"),
    plant: t.plant?.species ?? "Unnamed Plant",
    transferCycle: t.transfer_cycle || 0,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Transfer Timeline
      </h2>

      {timelineData.length === 0 ? (
        <p className="text-sm text-gray-500">No transfer data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={timelineData}
            margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{
                value: "Transfer #",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#6b7280" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="transferCycle"
              stroke="var(--future-lime)"
              strokeWidth={2}
              dot={{
                r: 5,
                strokeWidth: 2,
                fill: "#fff",
                stroke: "var(--future-lime)",
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
