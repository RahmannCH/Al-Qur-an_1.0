import { NextResponse } from "next/server";

const API_BASE = "https://api.aladhan.com/v1";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("latitude") || "-3.4472";
  const lng = searchParams.get("longitude") || "114.8405";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    const url = `${API_BASE}/timings/${date}?latitude=${lat}&longitude=${lng}&method=2`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ZadifyApp/1.0" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Aladhan API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Server prayer-times fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch prayer times from upstream" }, { status: 500 });
  }
}
