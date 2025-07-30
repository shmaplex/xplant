// components/dashboard/plants/PlantQRCode.tsx
"use client";
import QRCode from "react-qr-code";

export default function PlantQRCode({ plantId }: { plantId: string }) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/plants/${plantId}`;
  return (
    <div className="bg-white p-4 rounded-xl shadow w-fit">
      <QRCode value={url} size={128} />
      <p className="text-sm mt-2 text-center">{plantId}</p>
    </div>
  );
}
