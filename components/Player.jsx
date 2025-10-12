"use client"

export default function Player({ src }) {
  return (
    <div
      className="
        fixed bottom-4 left-1/2 z-50 w-[min(100%-1rem,860px)] -translate-x-1/2
        rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur-xl
        ring-1 ring-black/5 dark:ring-white/5
      "
      // Accent tokens for the player; using existing chart tokens for a warm (orange) → purple gradient
      style={{
        // Using CSS variables so we can reference them in arbitrary Tailwind selectors below
        "--player-accent-start": "var(--color-chart-5)", // warm/orange
        "--player-accent-end": "var(--color-chart-4)", // purple
      }}
    >
      {/* Accent bar */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-1
          bg-[linear-gradient(90deg,var(--player-accent-start),var(--player-accent-end))]
          rounded-t-2xl
        "
      />

      <div className="flex items-center gap-4 p-3 md:p-4">
        <audio
          controls
          src={src}
          className="
            w-full h-10 md:h-11
            rounded-xl bg-muted/60 text-foreground
            ring-1 ring-border shadow-sm transition
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--player-accent-end)] focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-background

            /* WebKit control surface */
            [&::-webkit-media-controls-enclosure]:bg-transparent
            [&::-webkit-media-controls-enclosure]:rounded-xl
            [&::-webkit-media-controls-panel]:bg-transparent

            /* Try to visually theme the timeline/progress area */
            [&::-webkit-media-controls-current-time-display]:text-foreground
            [&::-webkit-media-controls-time-remaining-display]:text-foreground
            [&::-webkit-media-controls-seek-back-button]:opacity-90
            [&::-webkit-media-controls-seek-forward-button]:opacity-90

            /* Subtle background to make controls feel integrated */
            bg-[radial-gradient(120%_120%_at_0%_0%,_color-mix(in_oklab,var(--player-accent-start)_18%,transparent),_transparent_60%)]"
        />
      </div>
    </div>
  )
}
