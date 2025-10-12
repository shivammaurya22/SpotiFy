"use client";
import React from "react";

export default function Player({ src }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white shadow p-3 rounded flex items-center gap-4">
      <audio controls src={src} className="w-full" />
    </div>
  );
}
