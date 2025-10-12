"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">MiniMusic</Link>
        <div className="flex items-center gap-3">
          <Link href="/search" className="text-sm hover:underline">Search</Link>
          <Link href="/upload" className="text-sm bg-gray-800 text-white px-3 py-1 rounded">Upload</Link>
        </div>
      </div>
    </nav>
  );
}
