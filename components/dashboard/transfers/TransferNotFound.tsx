// components/dashboard/transfers/TransferNotFound.tsx

import Link from "next/link";

export default function TransferNotFound() {
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Transfer Not Found
      </h2>
      <p className="mb-6 text-gray-700">
        Sorry, we couldn't find the transfer you were looking for.
      </p>
      <Link
        href="/dashboard/transfers"
        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Back to Transfers
      </Link>
    </div>
  );
}
