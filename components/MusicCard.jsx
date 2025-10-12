"use client";
import React from "react";
import Link from "next/link";

export default function MusicCard({ song }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-900 dark:focus-within:ring-offset-neutral-900">
      <div className="relative">
        <img
          src={song.coverUrl || "/placeholder.svg"}
          alt={song.title}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 dark:text-gray-100">
          {song.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-1 dark:text-gray-400">
          {song.singer}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <audio
            controls
            src={song.audioUrl}
            className="h-10 flex-1 rounded-md bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-gray-100 [&::-webkit-media-controls-panel]:bg-transparent [&::-webkit-media-controls-enclosure]:rounded-md"
          />
          <a
            href={song.audioUrl}
            download
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            Download
          </a>
        </div>

        <div className="mt-4">
          <Link
            href={`/song/${song._id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
          >
            Open
            <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}