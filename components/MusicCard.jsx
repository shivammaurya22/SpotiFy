"use client";
import React from "react";
import Link from "next/link";

export default function MusicCard({ song }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={song.coverUrl} alt={song.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{song.title}</h3>
        <p className="text-sm text-gray-600">{song.singer}</p>

        <div className="mt-3 flex gap-2">
          <audio controls src={song.audioUrl} className="flex-1" />
          <a href={song.audioUrl} download className="px-3 py-1 bg-green-600 text-white rounded text-sm whitespace-nowrap">Download</a>
        </div>

        <div className="mt-3">
          <Link href={`/song/${song._id}`} className="text-blue-600 text-sm hover:underline">Open</Link>
        </div>
      </div>
    </div>
  );
}
