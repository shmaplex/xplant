export default function MediaRecipeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-spore-grey p-8 text-center">
      <h1 className="text-4xl font-extrabold text-biochar-black mb-4">
        Oops! Media Recipe Not Found 📜
      </h1>
      <p className="text-lg text-moss-shadow max-w-md mb-6">
        Sorry, we couldn&apos;t find that media recipe. It might be on a
        creative break or hidden in the archives.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-future-lime text-moss-shadow rounded-lg font-semibold hover:bg-lime-500 transition"
      >
        Try Again
      </button>
    </div>
  );
}
