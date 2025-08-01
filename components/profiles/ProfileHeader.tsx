import Image from "next/image";
import { HiCheck } from "react-icons/hi";

interface ProfileHeaderProps {
  id: string;
  avatar_url?: string | null;
  full_name?: string | null;
  username?: string | null;
  bio?: string | null;
  phone?: string | null;
  isPremium?: boolean;
}

export default function ProfileHeader({
  id,
  avatar_url,
  full_name,
  username,
  bio,
  isPremium = false,
}: ProfileHeaderProps) {
  return (
    <section
      className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start p-10 sm:py-14 sm:pr-14 overflow-visible"
      style={{
        borderColor: "var(--color-spore-grey)",
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 rounded-l-3xl"
        style={{ backgroundColor: "var(--color-future-lime)" }}
      ></div>

      {/* Avatar container */}
      <div className="relative bg-white flex-shrink-0 -mt-20 sm:mt-0 sm:-ml-20 rounded-full overflow-hidden border-8 border-white shadow-xl">
        <Image
          src={
            avatar_url || `https://api.dicebear.com/7.x/lorelei/png?seed=${id}`
          }
          alt="User Avatar"
          width={160}
          height={160}
          className="object-cover w-40 h-40"
          priority
        />

        {/* Verified badge */}
        {isPremium && (
          <div
            className="absolute bottom-2 right-2 rounded-full w-7 h-7 flex items-center justify-center shadow-md"
            title="Verified Premium User"
            style={{
              backgroundColor: "var(--color-organic-amber)",
              color: "var(--color-biochar-black)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <HiCheck className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="mt-6 sm:mt-0 sm:ml-12 flex flex-col max-w-xl text-center sm:text-left">
        <h1
          className="text-4xl font-extrabold leading-tight flex items-center justify-center sm:justify-start gap-3"
          style={{ color: "var(--color-biochar-black)" }}
        >
          {full_name || username}
        </h1>

        {username && (
          <p
            className="mt-1 font-semibold text-lg tracking-wide"
            style={{ color: "var(--color-future-lime)" }}
          >
            @{username}
          </p>
        )}

        {bio && (
          <p
            className="mt-5 text-lg leading-relaxed max-w-lg"
            style={{ color: "var(--color-moss-shadow)" }}
          >
            {bio}
          </p>
        )}
      </div>
    </section>
  );
}
