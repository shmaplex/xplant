"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminUsersPage() {
  const supabase = createClient();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, created_at");
      if (error) {
        console.error("Error fetching users:", error);
      }
      if (data) setUsers(data);
    }

    fetchUsers();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--moss-shadow)] mb-4">
        Users
      </h1>
      <table className="w-full border-collapse border">
        <thead className="bg-[var(--spore-grey)]">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2 text-xs">{u.id}</td>
              <td className="border px-4 py-2">{u.email || "Unknown"}</td>
              <td className="border px-4 py-2">
                {new Date(u.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
