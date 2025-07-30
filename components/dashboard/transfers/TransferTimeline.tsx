import type { PlantTransfer } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

type TimelinePoint = {
  date: string;
  plant: string;
  transferCycle: number;
};

export default function TransferTimeline({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  // Prepare timeline data
  const timelineData: TimelinePoint[] = transfers.map((t) => ({
    date: new Date(t.transfer_date).toLocaleDateString("en-US"),
    plant: t.plant?.species ?? "Unnamed Plant",
    transferCycle: t.transfer_cycle || 0,
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Transfer Timeline
      </h2>

      {timelineData.length === 0 ? (
        <p className="text-sm text-gray-500">No transfer data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={timelineData}
            margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60}>
              <Label value="Date" offset={30} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{
                value: "Transfer #",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip formatter={(val: any) => [`${val}`, "Transfer #"]} />
            <Line
              type="monotone"
              dataKey="transferCycle"
              stroke="#82ca9d"
              name="Transfer #"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
