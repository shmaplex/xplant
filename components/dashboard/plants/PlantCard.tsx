import Link from "next/link";
import { Plant } from "@/lib/types";

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link href={`/plants/${plant.id}`}>
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
        <img
          src={plant.photo_url || "/placeholder-plant.png"}
          alt={plant.species}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
        <h3 className="font-semibold text-lg">{plant.species}</h3>
        <p className="text-sm text-gray-600">
          Stage: {plant.current_stage?.stage ?? "Unknown"}
        </p>
        <p className="text-xs text-gray-400">
          Transfers: {plant.transfer_cycle}
        </p>
      </div>
    </Link>
  );
}
