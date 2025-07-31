import { getUserProfile } from "@/api/user";
import Image from "next/image";

export default async function ProfileView({
  params,
}: {
  params: { id: string };
}) {
  const profile = await getUserProfile(params.id);

  if (!profile) {
    return (
      <div className="max-w-lg mx-auto text-center p-8">
        <h2 className="text-2xl font-bold text-red-500">Profile Not Found</h2>
        <p className="mt-2 text-gray-600">We couldn't find that user.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <Image
            src={
              profile.avatar_url ||
              `https://api.dicebear.com/7.x/lorelei/png?seed=${profile.id}`
            }
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-moss-shadow">
              {profile.full_name || profile.username}
            </h1>
            {profile.username && (
              <p className="text-gray-500">@{profile.username}</p>
            )}
          </div>
        </div>

        {profile.bio && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg text-moss-shadow mb-2">Bio</h2>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        )}

        {profile.phone && (
          <div className="mt-4 text-gray-600 text-sm">
            <strong>Phone:</strong> {profile.phone}
          </div>
        )}
      </div>
    </div>
  );
}
