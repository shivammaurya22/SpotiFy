import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Song from "@/models/Song";
import { v2 as cloudinary } from "cloudinary";


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // allow up to 50MB uploads
    },
  },
};

/**
 * Helper: upload buffer to cloudinary using upload_stream and return result.
 */
function uploadBufferToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title")?.toString() ?? "";
    const singer = formData.get("singer")?.toString() ?? "";
    const album = formData.get("album")?.toString() ?? "";

    const audioFile = formData.get("audio");
    const imageFile = formData.get("image");

    if (!title || !audioFile || !imageFile) {
      return NextResponse.json({ ok: false, message: "title, audio and image are required" }, { status: 400 });
    }

    // Convert to buffers
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload image (images default resource_type)
    const imageResult = await uploadBufferToCloudinary(imageBuffer, {
      folder: "covers",
      resource_type: "image"
    });

    // Upload audio — Cloudinary treats audio as resource_type "video" for direct upload/stream
    const audioResult = await uploadBufferToCloudinary(audioBuffer, {
      folder: "songs",
      resource_type: "video" // video type used for audio files in Cloudinary
    });

    // Optionally you could try to extract duration from audioResult.metadata if Cloudinary provides.
    const newSong = await Song.create({
      title,
      singer,
      album,
      coverUrl: imageResult.secure_url,
      audioUrl: audioResult.secure_url
    });

    return NextResponse.json({ ok: true, message: "Song uploaded", song: newSong });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
