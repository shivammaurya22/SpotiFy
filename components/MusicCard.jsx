"use client"
import { useState } from "react"
import Link from "next/link"
import { Play, Download } from "lucide-react"

export default function MusicCard({ song }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="group flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-200 dark:hover:border-orange-500/30">
      {/* Play Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 hover:scale-110"
      >
        <Play className="h-5 w-5 fill-white" />
      </button>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white truncate">{song.title}</h3>
        <p className="text-xs text-gray-400 truncate">{song.singer}</p>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0 text-xs text-gray-400 font-medium">{song.duration || "3:45"}</div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 flex gap-2">
        <a
          href={song.audioUrl}
          download
          className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-all duration-200"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </a>

        <Link
          href={`/song/${song._id}`}
          className="p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 transition-all duration-200"
          title="Open"
        >
          <span className="text-sm">→</span>
        </Link>
      </div>
    </div>
  )
}
