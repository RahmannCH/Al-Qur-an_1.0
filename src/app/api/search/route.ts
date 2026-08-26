import { NextResponse } from "next/server";

const BASE_URL = "https://api.quran.com/api/v4";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const language = searchParams.get("language") || "id";
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "20";

  if (!q.trim()) {
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
    url.searchParams.set("q", q.trim());
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

      // Jika Quran.com API mengembalikan hasil, pakai langsung!
      if (searchData && searchData.results && searchData.results.length > 0) {
        return NextResponse.json(data);
      }
    }

    // 2. Fallback untuk Stopwords (misal "jika", "maka", "apabila") yang dibuang oleh Elasticsearch
    // Coba tambahkan suffix/prefix wildcard atau gabungan kata kunci untuk memaksa Elasticsearch merespon
    const fallbackQueries = [`"${q.trim()}"`, `${q.trim()} kamu`, `${q.trim()} Allah`, `${q.trim()} mereka`];

    for (const altQ of fallbackQueries) {
      const altUrl = new URL(`${BASE_URL}/search`);
      altUrl.searchParams.set("q", altQ);
      altUrl.searchParams.set("language", language);
      altUrl.searchParams.set("size", size);
      altUrl.searchParams.set("page", page);

      const altRes = await fetch(altUrl.toString(), {
        headers: { "User-Agent": "ZadifyApp/1.0" },
        next: { revalidate: 3600 },
      });

      if (altRes.ok) {
        const altData = await altRes.json();
        if (altData.search && altData.search.results && altData.search.results.length > 0) {
          // Ganti tag highlight <em> pada kata kunci asli
          const cleanedResults = altData.search.results.map((r: any) => ({
            ...r,
            translations: r.translations.map((t: any) => ({
              ...t,
              text: t.text.replace(
                new RegExp(`(${q.trim()})`, "gi"),
                "<em>$1</em>"
              ),
            })),
          }));

          return NextResponse.json({
            search: {
              query: q,
              total_results: altData.search.total_results || cleanedResults.length,
              current_page: Number(page),
              total_pages: altData.search.total_pages || 1,
              results: cleanedResults,
            },
          });
        }
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
