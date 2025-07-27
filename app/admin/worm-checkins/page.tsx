"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Checkin = {
  id: number;
  checkin_date: string;
  video_url: string;
  notes: string;
};

function toLocalISO(date: Date) {
  const offset = date.getTimezoneOffset();
  const d = new Date(date.getTime() - offset * 60 * 1000);
  return d.toISOString().split("T")[0];
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [date, setDate] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/login");
      else setSession(data.session);
    });
  }, [router]);

  useEffect(() => {
    if (session) fetchCheckins();
  }, [session]);

  async function fetchCheckins() {
    const { data, error } = await supabase
      .from("worm_checkins")
      .select("*")
      .order("checkin_date", { ascending: false });

    if (!error && data) setCheckins(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    const { error } = await supabase.from("worm_checkins").insert({
      checkin_date: date,
      video_url: videoUrl,
      notes,
    });
    if (error) alert(error.message);
    else {
      setDate("");
      setVideoUrl("");
      setNotes("");
      fetchCheckins();
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this check-in?")) return;
    const { error } = await supabase
      .from("worm_checkins")
      .delete()
      .eq("id", id);
    if (error) alert(error.message);
    else fetchCheckins();
  }

  function handleEdit(checkin: Checkin) {
    setEditingId(checkin.id);
    setEditVideoUrl(checkin.video_url);
    setEditNotes(checkin.notes);
  }

  async function handleSaveEdit(id: number) {
    const { data, error } = await supabase
      .from("worm_checkins")
      .update({
        video_url: editVideoUrl,
        notes: editNotes,
      })
      .eq("id", id)
      .select(); // important: return the updated row

    if (error) {
      alert(error.message);
    } else {
      setEditingId(null);
      // Replace updated item in state directly for instant UI update
      setCheckins((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data[0] } : c))
      );
    }
  }

  if (!session) return <p>Loading...</p>;

  const checkinDates = new Set(checkins.map((c) => c.checkin_date));
  const onDateClick = (value: Date) => setSelectedDate(value);

  const selectedDateIso = selectedDate ? toLocalISO(selectedDate) : null;
  const todaysCheckins = checkins.filter(
    (c) => c.checkin_date === selectedDateIso
  );

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 py-16 mb-12 shadow-lg">
          <div className="max-w-5xl mx-auto text-center text-white px-6">
            <h1 className="text-4xl font-bold mb-3">Worm Check-in Dashboard</h1>
            <p className="text-green-100 text-lg">
              Track and manage your worm farm check-ins
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16 flex flex-col gap-10">
          {/* Calendar */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Select a Date
            </h2>
            <div className="flex justify-center mb-10">
              <div className="rounded-2xl border border-green-100 bg-white shadow-md p-4">
                <Calendar
                  onClickDay={onDateClick}
                  value={selectedDate || new Date()}
                  tileClassName={({ date }) =>
                    checkinDates.has(toLocalISO(date))
                      ? "has-checkin"
                      : undefined
                  }
                  tileContent={({ date }) =>
                    checkinDates.has(toLocalISO(date)) ? (
                      <div className="flex justify-center mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      </div>
                    ) : null
                  }
                  className="modern-calendar"
                />
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Check-ins list */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {selectedDate
                  ? `Check-ins for ${selectedDate.toDateString()}`
                  : "Choose a date to see check-ins"}
              </h2>
              {todaysCheckins.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow text-gray-600">
                  No check-ins for this date.
                </div>
              ) : (
                <ul className="space-y-4">
                  {todaysCheckins.map((c) => (
                    <li
                      key={c.id}
                      className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                    >
                      {editingId === c.id ? (
                        <div className="space-y-3">
                          <input
                            type="url"
                            value={editVideoUrl}
                            onChange={(e) => setEditVideoUrl(e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Video URL"
                          />
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Notes"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(c.id)}
                              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {c.video_url && (
                            <a
                              href={c.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-green-700 hover:underline block mb-2"
                            >
                              🎥 Watch video
                            </a>
                          )}
                          {c.notes && (
                            <p className="text-gray-800 leading-relaxed mb-4">
                              {c.notes}
                            </p>
                          )}
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(c)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add new check-in */}
            <div>
              <div className="bg-green-50 border border-green-100 rounded-xl shadow-md p-6 sticky top-10">
                <h2 className="text-xl font-bold mb-4 text-green-700">
                  Add New Check-in
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="url"
                    placeholder="YouTube video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border p-3 w-full rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition w-full font-medium"
                  >
                    Save Check-in
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
