import { notFound, redirect } from "next/navigation";
import { getUserProfile } from "@/lib/api/user";
import ProfileHeader from "@/components/profiles/ProfileHeader";
import Link from "next/link";
import PlantCard from "@/components/dashboard/plants/PlantCard";
import MediaRecipeCard from "@/components/dashboard/media/MediaRecipeCard";
import { getCurrentUserId, getUserProfileByUsername } from "@/lib/api/user";
import { FiPlus } from "react-icons/fi";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import ContaminationCard from "@/components/dashboard/contamination/ContaminationCard";

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
      return <NotLoggedIn />;
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
      <section className="relative z-10">
        <ProfileHeader
          id={profile.id}
          avatar_url={profile.avatar_url}
          full_name={profile.full_name}
          username={profile.username}
          bio={profile.bio}
          isPremium={profile.is_premium}
        />
      </section>

      {/* Plants Section */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(183,239,72,0.3),transparent_70%)] blur-3xl pointer-events-none"
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-moss-shadow">Plants</h2>
          <Link
            href="/dashboard/plants/new"
            className="px-5 py-2 bg-future-lime text-moss-shadow hover:bg-moss-shadow hover:text-future-lime rounded-md font-semibold transition whitespace-nowrap flex items-center justify-center duration-500 ease-in-out"
          >
            <FiPlus className="w-4 h-4 mr-1" />
            Add Plant
          </Link>
        </div>
        <div
          className="relative max-h-[45vh] overflow-auto py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {plants.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {plants.map((plant: any) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-moss-shadow)" }} className="italic">
              No plants logged yet.
            </p>
          )}
        </div>
      </section>

      {/* Media Recipes Section */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(211,168,249,0.3),transparent_70%)] blur-3xl pointer-events-none"
        />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-psybeam-purple-dark">
            Media Recipes
          </h2>
          <Link
            href="/dashboard/media/new"
            className="px-5 py-2 rounded-md font-semibold transition whitespace-nowrap flex items-center justify-center text-psybeam-purple-dark hover:text-psybeam-purple bg-psybeam-purple hover:bg-psybeam-purple-dark duration-500 ease-in-out"
          >
            <FiPlus className="w-4 h-4 mr-1" />
            Add Recipe
          </Link>
        </div>
        <div
          className="relative max-h-[45vh] overflow-auto py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
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
        </div>
      </section>

      <section className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-50 rounded-3xl bg-[radial-gradient(circle_at_bottom_left,rgba(217,107,107,0.3),transparent_70%)] blur-3xl pointer-events-none"
        />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-bio-red">
            Contamination Logs
          </h2>
          <Link
            href="/dashboard/contamination/new"
            className="px-5 py-2 rounded-md font-semibold transition whitespace-nowrap flex items-center justify-center text-bio-red hover:text-bio-red-light bg-bio-red/50 hover:bg-bio-red duration-500 ease-in-out"
          >
            <FiPlus className="w-4 h-4 mr-1" />
            Add Contamination
          </Link>
        </div>
        <div
          className="relative max-h-[45vh] overflow-auto py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {logs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {logs.map((log: any) => (
                <ContaminationCard key={log.id} log={log} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-moss-shadow)" }} className="italic">
              No contaminations yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
