// app/profile/[username]/loading.tsx
"use client";

import Loader from "@/components/ui/Loader";

export default function ProfileLoading() {
  return (
    <Loader
      message="Growing your profile garden..."
      iconColor="text-spore-grey"
      bgColor="bg-spore-grey/30"
      mainBgColor="bg-spore-grey/10"
      textColor="text-biochar-black"
    />
  );
}
