export default function PlantNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-8 text-center">
      <h1 className="text-4xl font-extrabold text-green-800 mb-4">
        Oops! Plant Not Found 🌱
      </h1>
      <p className="text-lg text-green-700 max-w-md mb-6">
        Looks like this plant took a little detour in the garden and can’t be
        found right now. Maybe it&apos;s hiding in a secret greenhouse? 🌿
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
