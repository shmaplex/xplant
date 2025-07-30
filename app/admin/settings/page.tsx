"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiRefreshCw,
  FiPlusCircle,
} from "react-icons/fi";

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);

  const [users, setUsers] = useState<any[]>([]);
  const [showEmails, setShowEmails] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loadingSettings, setLoadingSettings] = useState(true);

  // For new feature flag input
  const [newFlagName, setNewFlagName] = useState("");

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id ?? null);
    }
    fetchUser();
  }, []);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
      }
      setUsers(data || []);
      setLoadingUsers(false);
    }

    fetchUsers();
  }, [supabase]);

  // Fetch app settings
  useEffect(() => {
    async function fetchSettings() {
      setLoadingSettings(true);
      const { data, error } = await supabase
        .from("app_settings")
        .select("key,value");

      if (error) {
        console.error("Error fetching settings:", error);
      } else {
        const map: Record<string, any> = {};
        data?.forEach((row) => {
          map[row.key] = row.value;
        });
        setSettings(map);
      }
      setLoadingSettings(false);
    }

    fetchSettings();
  }, [supabase]);

  // Update setting helper
  async function updateSetting(
    key: string,
    newValue: any,
    userId?: string | null
  ) {
    const now = new Date().toISOString();

    // optimistic update
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    const payload: any = {
      key,
      value: newValue,
      updated_at: now,
    };

    if (userId) {
      payload.updated_by = userId;
    }

    const { error } = await supabase.from("app_settings").upsert(payload);

    if (error) console.error("Failed to update setting:", error);
  }

  const maintenanceEnabled = settings["maintenance_mode"]?.enabled || false;
  const defaultTimezone = settings["default_timezone"]?.value || "UTC";
  const allowSignups = settings["allow_signups"]?.enabled ?? true;

  const featureFlags: Record<string, boolean> = settings["feature_flags"] || {};

  function toggleFeatureFlag(flagKey: string, value: boolean) {
    const updatedFlags = { ...featureFlags, [flagKey]: value };
    updateSetting("feature_flags", updatedFlags, userId);
  }

  function addFeatureFlag() {
    const trimmed = newFlagName.trim();
    if (!trimmed) return;
    if (featureFlags.hasOwnProperty(trimmed)) {
      alert("Feature flag already exists!");
      return;
    }
    const updatedFlags = { ...featureFlags, [trimmed]: false };
    updateSetting("feature_flags", updatedFlags, userId);
    setNewFlagName("");
  }

  return (
    <>
      {/* Fixed quick toggles */}
      <div
        className="fixed top-4 left-4 bg-green-50 border border-green-300 rounded-xl p-6 shadow-lg max-w-xs z-50"
        style={{ minWidth: 240 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-green-800">
          Quick Toggles
        </h2>
        <label className="flex items-center justify-between gap-2 mb-4 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-green-100">
          <span>Maintenance Mode</span>
          <input
            type="checkbox"
            className="w-6 h-6 cursor-pointer"
            checked={maintenanceEnabled}
            onChange={(e) =>
              updateSetting(
                "maintenance_mode",
                { enabled: e.target.checked },
                userId ?? undefined
              )
            }
          />
        </label>
        <label className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-green-100">
          <span>Allow User Signups</span>
          <input
            type="checkbox"
            className="w-6 h-6 cursor-pointer"
            checked={allowSignups}
            onChange={(e) =>
              updateSetting(
                "allow_signups",
                { enabled: e.target.checked },
                userId ?? undefined
              )
            }
          />
        </label>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-6">
          Admin Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">General App Settings</h2>
            {loadingSettings ? (
              <p>Loading settings…</p>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <span>Default Timezone</span>
                  <select
                    className="border rounded p-1"
                    value={defaultTimezone}
                    onChange={(e) =>
                      updateSetting(
                        "default_timezone",
                        { value: e.target.value },
                        userId ?? undefined
                      )
                    }
                  >
                    <option value="UTC">UTC</option>
                    <option value="Asia/Seoul">Asia/Seoul</option>
                  </select>
                </label>
              </div>
            )}
          </section>

          <section className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center justify-between">
              Feature Flags
              <button
                onClick={addFeatureFlag}
                disabled={!newFlagName.trim()}
                className="flex items-center gap-1 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add new feature flag"
              >
                <FiPlusCircle size={20} /> Add
              </button>
            </h2>
            {loadingSettings ? (
              <p>Loading feature flags…</p>
            ) : (
              <>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="New feature flag name"
                    value={newFlagName}
                    onChange={(e) => setNewFlagName(e.target.value)}
                    className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {Object.entries(featureFlags).length === 0 && (
                  <p className="text-gray-500">No feature flags configured.</p>
                )}

                <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                  {Object.entries(featureFlags).map(([flag, enabled]) => (
                    <label
                      key={flag}
                      className="flex items-center justify-between gap-2 p-3 bg-green-50 rounded-lg shadow-sm cursor-pointer hover:bg-green-100"
                    >
                      <span className="break-words">{flag}</span>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) =>
                          toggleFeatureFlag(flag, e.target.checked)
                        }
                        className="w-6 h-6 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        <section className="bg-white rounded-xl shadow p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">User Signup</h2>
          {loadingSettings ? (
            <p>Loading signup setting…</p>
          ) : (
            <label className="flex items-center justify-between gap-2 p-4 bg-green-50 rounded-lg shadow-sm cursor-pointer hover:bg-green-100 max-w-xs mx-auto">
              <span>Allow user signups</span>
              <input
                type="checkbox"
                checked={allowSignups}
                onChange={(e) =>
                  updateSetting(
                    "allow_signups",
                    { enabled: e.target.checked },
                    userId ?? undefined
                  )
                }
                className="w-6 h-6 cursor-pointer"
              />
            </label>
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <button
              onClick={() => setShowEmails((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {showEmails ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              {showEmails ? "Hide emails" : "Show emails"}
            </button>
          </div>

          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Joined</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="even:bg-gray-50">
                    <td className="border p-2">{u.full_name || "—"}</td>
                    <td className="border p-2">
                      {showEmails ? u.email : "••••••••"}
                    </td>
                    <td className="border p-2">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      <button className="text-sm text-red-500 hover:underline">
                        Ban
                      </button>
                      {" • "}
                      <button className="text-sm text-blue-500 hover:underline">
                        Make Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Plant Management</h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
              <FiTrash2 size={16} /> Delete All Plants
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              Export Plants CSV
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Media Recipes</h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              Export Recipes CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
              Archive All Recipes
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">System Diagnostics</h2>
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              <FiRefreshCw size={16} /> Clear Cache
            </button>
            <p className="text-gray-600 text-sm">Storage usage: Coming soon…</p>
          </div>
        </section>
      </div>
    </>
  );
}
