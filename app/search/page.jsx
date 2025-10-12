"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MusicCard from "@/components/MusicCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/songs?search=${encodeURIComponent(query)}&limit=100`);
      const data = await res.json();
      setSongs(data.songs || []);
    } catch (err) {
      console.error(err);
      setSongs([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="Search by title, singer, album..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!query || loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {songs.map((s) => (
            <MusicCard key={s._id} song={s} />
          ))}
          {songs.length === 0 && !loading && <p>No results. Try another search.</p>}
        </div>
      </main>
    </div>
  );
}
