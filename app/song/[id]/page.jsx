import Navbar from "@/components/Navbar"
import Player from "@/components/Player"
import { Heart, Download } from "lucide-react"

async function fetchSong(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/songs?limit=200`, {
    cache: "no-store",
  })
  const data = await res.json()
  const songs = data.songs || []
  return songs.find((s) => s._id === id) || null
}

export default async function SongPage({ params }) {
  const { id } = params
  const song = await fetchSong(id)

  if (!song) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <main className="p-6">
          <p className="text-slate-300">Song not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col items-center gap-8">
          {/* Album Cover */}
          <div className="relative group">
            <img
              src={song.coverUrl || "/placeholder.svg"}
              alt={song.title}
              className="w-64 h-64 object-cover rounded-xl shadow-2xl group-hover:shadow-orange-500/20 transition"
            />
            <button className="absolute top-4 right-4 p-3 bg-slate-900/80 backdrop-blur rounded-full hover:bg-orange-500 transition text-slate-300 hover:text-white">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Song Info */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">{song.title}</h2>
            <p className="text-sm text-slate-400">
              {song.singer} • {song.album}
            </p>
          </div>

          {/* Download Button */}
          <a
            href={song.audioUrl}
            download
            className="
              flex items-center gap-2 px-6 py-3 rounded-lg
              bg-orange-500 hover:bg-orange-600 text-white
              transition-all duration-200 hover:shadow-lg
            "
          >
            <Download className="w-4 h-4" />
            Download MP3
          </a>
        </div>
      </main>

      {/* Player at bottom */}
      <Player src={song.audioUrl} />
    </div>
  )
}
