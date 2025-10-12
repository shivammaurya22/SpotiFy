import React from "react";
import Navbar from "@/components/Navbar";
import MusicCard from "@/components/MusicCard";

async function fetchSongs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/songs?limit=50`, { cache: "no-store" });
  const data = await res.json();
  return data.songs || [];
}

export default async function Home() {
  const songs = await fetchSongs();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trending Songs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {songs.map((s) => (
            <MusicCard key={s._id} song={s} />
          ))}
        </div>
      </main>
    </div>
  );
}
