"use client"

import { useState, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react"

export default function Player({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="
              w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer
              accent-orange-500 hover:accent-orange-400 transition
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5
              [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-125
              [&::-webkit-slider-thumb]:transition
              [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg
            "
          />
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Like/Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="
              p-2 rounded-lg hover:bg-slate-800 transition
              text-slate-400 hover:text-orange-500
            "
          >
            <Heart className="w-5 h-5 transition" fill={isFavorite ? "currentColor" : "none"} />
          </button>

          {/* Player Controls */}
          <div className="flex items-center gap-8">
            {/* Skip Back */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10)
              }}
              className="
                p-2 rounded-lg hover:bg-slate-800 transition
                text-slate-300 hover:text-orange-500
              "
            >
              <SkipBack className="w-6 h-6" />
            </button>

            {/* Play/Pause - Large Center Button */}
            <button
              onClick={togglePlay}
              className="
                w-16 h-16 rounded-full
                bg-orange-500 hover:bg-orange-600
                text-white shadow-lg hover:shadow-xl
                flex items-center justify-center transition-all duration-200
                hover:scale-105 active:scale-95
              "
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10)
              }}
              className="
                p-2 rounded-lg hover:bg-slate-800 transition
                text-slate-300 hover:text-orange-500
              "
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Spacer for alignment */}
          <div className="w-9" />
        </div>
      </div>
    </div>
  )
}
