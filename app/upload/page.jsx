"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    singer: "",
    album: "",
    image: null,
    audio: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm((p) => ({ ...p, [name]: files[0] }));
    else setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.audio || !form.image) {
      setMessage("Title, audio and cover image are required.");
      return;
    }
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("title", form.title);
    data.append("singer", form.singer);
    data.append("album", form.album);
    data.append("image", form.image);
    data.append("audio", form.audio);

    try {
      const res = await fetch("/api/songs/upload", { method: "POST", body: data });
      const json = await res.json();
      if (json.ok) {
        setMessage("Upload successful!");
        setForm({ title: "", singer: "", album: "", image: null, audio: null });
      } else {
        setMessage("Upload failed: " + (json.message || json.error || "Unknown"));
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Upload a new song</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
          <input name="singer" value={form.singer} onChange={handleChange} placeholder="Singer" className="w-full border p-2 rounded" />
          <input name="album" value={form.album} onChange={handleChange} placeholder="Album / Movie" className="w-full border p-2 rounded" />

          <div>
            <label className="block mb-1">Cover Image (jpg/png)</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1">Audio (mp3)</label>
            <input type="file" name="audio" accept="audio/*" onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Uploading..." : "Upload"}
          </button>

          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </main>
    </div>
  );
}
