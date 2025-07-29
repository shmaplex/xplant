"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";
import { Eye, EyeOff } from "lucide-react"; // You can install lucide-react or use any icon library

export default function AdminUsersPage() {
  const supabase = createClient();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Track which emails are revealed (by user id or email)
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>(
    {}
  );
  // Similarly for ids, if you want
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, role, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
      }

      setUsers(data || []);
      setLoading(false);
    }

    fetchUsers();
  }, [supabase]);

  function toggleEmail(id: string) {
    setRevealedEmails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function toggleId(id: string) {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-8">
        Users
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-lime-400 border-t-transparent rounded-full" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-md">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No users found
          </h2>
          <p className="text-gray-500 max-w-md text-center">
            It looks like no one has signed up yet. Once users start signing up,
            they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-md bg-white">
          <table className="w-full">
            <thead className="bg-[var(--spore-grey)]">
              <tr>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* ID with toggle */}
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">
                    <button
                      onClick={() => toggleId(u.id)}
                      aria-label={revealedIds[u.id] ? "Hide ID" : "Show ID"}
                      className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                      type="button"
                    >
                      {revealedIds[u.id] ? (
                        <>
                          <EyeOff size={16} />
                          <span>{u.id}</span>
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          <span>••••••••••••</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Email with toggle */}
                  <td className="px-6 py-4 break-all">
                    <button
                      onClick={() => toggleEmail(u.id)}
                      aria-label={
                        revealedEmails[u.id] ? "Hide Email" : "Show Email"
                      }
                      className="inline-flex items-center space-x-1 text-gray-800 hover:text-black"
                      type="button"
                    >
                      {revealedEmails[u.id] ? (
                        <span>{u.email}</span>
                      ) : (
                        <span className="select-none">••••••••••••</span>
                      )}
                      {revealedEmails[u.id] ? (
                        <EyeOff size={16} className="ml-2" />
                      ) : (
                        <Eye size={16} className="ml-2" />
                      )}
                    </button>
                  </td>

                  {/* Other fields */}
                  <td className="px-6 py-4">{u.full_name || "-"}</td>
                  <td className="px-6 py-4 font-semibold text-sm capitalize">
                    {u.role || "user"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(u.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
