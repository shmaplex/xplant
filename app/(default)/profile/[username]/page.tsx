import { notFound, redirect } from "next/navigation";
import { getUserProfile } from "@/api/user";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import Link from "next/link";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import MediaRecipeCard from "@/components/dashboard/media/MediaRecipeCard";
import ContaminationLogs from "@/components/dashboard/contamination/ContaminationLogs";
import { getCurrentUserId, getUserProfileByUsername } from "@/api/user";

export default async function ProfileView({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (!username) {
    return notFound();
  }

  // If the URL is /profile/me, resolve actual username and redirect
  if (username === "me") {
    const userId = await getCurrentUserId();

    if (!userId) {
      return (
        <div className="max-w-lg mx-auto text-center p-8">
          <h2 className="text-2xl font-bold text-red-600">Not logged in</h2>
          <p>Please log in to view your profile.</p>
        </div>
      );
    }

    const currentUserProfile = await getUserProfile(userId);
    if (!currentUserProfile?.username) {
      throw new Error("Current user does not have a username");
    }

    // Redirect to the resolved username URL
    redirect(`/profile/${currentUserProfile.username}`);
  }

  const profile = await getUserProfileByUsername(username, {
    include: ["plants", "media_recipes", "contamination_logs"],
  });

  if (!profile) {
    return notFound();
  }

  const plants = profile.plants || [];
  const recipes = profile.media_recipes || [];
  const logs = profile.contamination_reports || [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero/Profile Header */}
      <ProfileHeader
        id={profile.id}
        avatar_url={profile.avatar_url}
        full_name={profile.full_name}
        username={profile.username}
        bio={profile.bio}
        isPremium={profile.is_premium}
      />

      {/* Plants Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--color-biochar-black)" }}
          >
            Plants
          </h2>
          <Link
            href="/dashboard/plants/new"
            className="px-5 py-2 rounded-md font-semibold transition"
            style={{
              backgroundColor: "var(--color-future-lime)",
              color: "var(--color-biochar-black)",
            }}
          >
            + Add Plant
          </Link>
        </div>
        {plants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {plants.map((plant: any) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-moss-shadow)" }} className="italic">
            No plants logged yet.
          </p>
        )}
      </section>

      {/* Media Recipes Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--color-biochar-black)" }}
          >
            Media Recipes
          </h2>
          <Link
            href="/dashboard/media/new"
            className="px-5 py-2 rounded-md font-semibold transition"
            style={{
              backgroundColor: "var(--color-organic-amber)",
              color: "var(--color-biochar-black)",
            }}
          >
            + Add Media Recipe
          </Link>
        </div>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recipes.map((recipe: any) => (
              <MediaRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-moss-shadow)" }} className="italic">
            No media recipes created yet.
          </p>
        )}
      </section>

      {/* Contamination Logs Section */}
      <ContaminationLogs logs={logs} />
    </main>
  );
}
