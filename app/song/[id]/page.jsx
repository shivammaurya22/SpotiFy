import React from "react";
import Navbar from "@/components/Navbar";

async function fetchSong(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/songs?limit=200`, { cache: "no-store" });
  const data = await res.json();
  const songs = data.songs || [];
  return songs.find((s) => s._id === id) || null;
}

export default async function SongPage({ params }) {
  const { id } = params;
  const song = await fetchSong(id);

  if (!song) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="p-6">
          <p>Song not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col items-center gap-6">
          <img src={song.coverUrl} alt={song.title} className="w-64 h-64 object-cover rounded-lg shadow" />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{song.title}</h2>
            <p className="text-sm text-gray-600">{song.singer} • {song.album}</p>
          </div>

          <audio controls src={song.audioUrl} className="w-full" />
          <a
            href={song.audioUrl}
            download
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download MP3
          </a>
        </div>
      </main>
    </div>
  );
}
