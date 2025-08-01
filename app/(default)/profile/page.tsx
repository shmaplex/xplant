"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createClient } from "@/lib/supabase/client";
import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import { getCountryFromNavigator } from "@/lib/country";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [detectedCountry, setDetectedCountry] = useState("KR");

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [authProvider, setAuthProvider] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch("/api/get-country");
        if (res.ok) {
          const { country } = await res.json();
          if (country) {
            setDetectedCountry(country);
          } else {
            const country = getCountryFromNavigator() || "KR";
            setDetectedCountry(country);
          }
        } else {
          const country = getCountryFromNavigator() || "KR";
          setDetectedCountry(country);
        }
      } catch {
        const country = getCountryFromNavigator() || "KR";
        setDetectedCountry(country);
      }
    }
    fetchCountry();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Not authenticated or failed to load");
        const data = await res.json();

        setFullName(data.full_name || "");
        setDisplayName(data.display_name || data.full_name || "");
        const formattedPhone = parsePhoneNumberFromString(data.phone || "");
        setPhone(formattedPhone?.isValid() ? formattedPhone.number : "");
        setEmail(data.email || "");
        setAuthProvider(data.app_metadata?.provider || null);

        setProfile(data);
      } catch (error) {
        toast.error("You must be logged in to edit your profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleAvatarUpload = async () => {
    if (!avatarFile || !profile) return;
    setUploading(true);

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${profile.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      toast.error("Error uploading avatar.");
      setUploading(false);
      return;
    }

    const publicUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
      .data.publicUrl;

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_url: publicUrl,
          metadata: {
            ...(profile.metadata || {}),
            avatar_updated_at: new Date().toISOString(),
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to update avatar");
      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setAvatarFile(null);
      toast.success("Avatar updated!");
    } catch (error) {
      toast.error("Failed to update avatar.");
    }

    setUploading(false);
  };

  const handleSave = async () => {
    if (!profile) return;

    // Email validation
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation (optional, only if phone is filled)
    if (phone) {
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        toast.error("Please enter a valid phone number (e.g. +821012345678).");
        return;
      }
    }

    setSaving(true);

    try {
      // Update Supabase Auth info
      const { error: authError } = await supabase.auth.updateUser({
        email,
        phone: phone || undefined,
        data: {
          display_name: displayName,
        },
      });

      if (authError) {
        console.error(authError);
        throw new Error("Failed to update authentication info.");
      }

      // Update profile row
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          username: profile.username,
          bio: profile.bio,
          phone,
          metadata: {
            ...(profile.metadata || {}),
            last_updated_by_user: new Date().toISOString(),
            preferred_theme: "light",
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push(`/profile/${profile.username}`);
      }, 1200);
    } catch (err) {
      toast.error("Error updating profile.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-moss-shadow">
        <FaSpinner className="animate-spin mr-2 text-future-lime text-2xl" />
        <span className="text-lg font-medium">Loading your profile…</span>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-[75vh]">
      <h1 className="text-3xl font-bold mb-6 text-moss-shadow flex items-center gap-2">
        Edit Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={
              profile?.avatar_url ||
              `https://api.dicebear.com/7.x/lorelei/png?seed=${
                profile?.id ?? "default-seed"
              }`
            }
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full border object-cover"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
            <button
              onClick={handleAvatarUpload}
              disabled={uploading || !avatarFile}
              className="mt-2 px-3 py-1 rounded bg-future-lime text-moss-shadow font-semibold hover:bg-lime-500 transition"
            >
              {uploading ? "Uploading..." : "Upload Avatar"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              className="w-full border rounded p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Display name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Display Name
            </label>
            <input
              className="w-full border rounded p-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          {/* Email with eye toggle */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                className="w-full border rounded p-2 pr-10"
                type={showEmail ? "text" : "password"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowEmail((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showEmail ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {authProvider === "google" && (
              <p className="text-sm text-gray-500 mt-1">
                Signed in with Google – manage email in your Google account.
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              className="w-full border rounded p-2"
              value={profile?.username || ""}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={profile?.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="phone-input">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <PhoneInput
              defaultCountry={detectedCountry}
              value={phone}
              onChange={(value) => setPhone(value || "")}
              className="w-full border rounded p-2"
              international
              countryCallingCodeEditable={false}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`mt-6 px-4 py-2 rounded font-semibold transition 
          ${
            saving
              ? "bg-future-lime/70 text-moss-shadow cursor-not-allowed"
              : "bg-future-lime text-moss-shadow hover:bg-lime-500"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
