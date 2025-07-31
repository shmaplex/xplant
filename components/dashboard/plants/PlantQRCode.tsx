"use client";

import QRCode from "react-qr-code";

export default function PlantQRCode({
  plantId,
  url,
}: {
  plantId: string;
  url?: string;
}) {
  const finalUrl =
    url || `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/plants/${plantId}`;

  return (
    <div className="flex flex-col justify-between items-center bg-white p-4 aspect-square w-fit mx-auto">
      <QRCode value={finalUrl} size={128} />
      <p className="text-xs mt-2 text-gray-500 break-all max-w-[128px] text-center">
        {plantId}
      </p>
    </div>
  );
}
