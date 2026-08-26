import { NextResponse } from "next/server";

const BASE_URL = "https://api.quran.com/api/v4";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawQ = searchParams.get("q") || "";
  const language = searchParams.get("language") || "id";
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";

  const q = rawQ.trim();

  if (!q) {
    return NextResponse.json({
      search: {
        query: "",
        total_results: 0,
        current_page: 1,
        total_pages: 1,
        results: [],
      },
    });
  }

  try {
    // 1. Coba pencarian utama melalui Quran.com API
    const url = new URL(`${BASE_URL}/search`);
    url.searchParams.set("q", q);
    url.searchParams.set("language", language);
    url.searchParams.set("size", size);
    url.searchParams.set("page", page);

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "ZadifyApp/1.0" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const searchData = data.search;

      if (searchData && searchData.results && searchData.results.length > 0) {
        return NextResponse.json(data);
      }
    }

    // 2. Fallback untuk Stopwords (misal "jika", "maka", "apabila"): coba exact phrase query
    const phraseUrl = new URL(`${BASE_URL}/search`);
    phraseUrl.searchParams.set("q", `"${q}"`);
    phraseUrl.searchParams.set("language", language);
    phraseUrl.searchParams.set("size", size);
    phraseUrl.searchParams.set("page", page);

    const phraseRes = await fetch(phraseUrl.toString(), {
      headers: { "User-Agent": "ZadifyApp/1.0" },
      next: { revalidate: 3600 },
    });

    if (phraseRes.ok) {
      const phraseData = await phraseRes.json();
      if (phraseData.search && phraseData.search.results && phraseData.search.results.length > 0) {
        return NextResponse.json(phraseData);
      }
    }

    return NextResponse.json({
      search: {
        query: q,
        total_results: 0,
        current_page: 1,
        total_pages: 1,
        results: [],
      },
    });
  } catch (error: any) {
    console.error("Search API proxy error:", error);
    return NextResponse.json(
      {
        search: {
          query: q,
          total_results: 0,
          current_page: 1,
          total_pages: 1,
          results: [],
        },
      },
      { status: 500 }
    );
  }
}
