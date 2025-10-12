import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Song from "@/models/Song";

/**
 * GET /api/songs
 * optional query params:
 *  ?search=term  -> search by title / singer / album
 *  ?limit=20
 *  ?sort=createdAt (default)
 */
export async function GET(request) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const limit = parseInt(url.searchParams.get("limit") || "100", 10);
    const sort = url.searchParams.get("sort") || "-createdAt";

    const query = {};
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { singer: regex }, { album: regex }];
    }

    const songs = await Song.find(query).sort(sort).limit(limit).lean();
    return NextResponse.json({ ok: true, songs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
