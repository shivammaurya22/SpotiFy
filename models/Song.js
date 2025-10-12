import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  singer: { type: String, default: "" },
  album: { type: String, default: "" },
  coverUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  duration: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

// Use existing model if present (prevents model overwrite errors in dev)
export default mongoose.models.Song || mongoose.model("Song", SongSchema);
