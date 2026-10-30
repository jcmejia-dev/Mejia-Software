import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2 || query.length > 80) {
    return NextResponse.json({ error: "Enter at least two characters." }, { status: 400 });
  }

  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "en",
    format: "json",
  });

  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Location search is unavailable." }, { status: 502 });
    }

    const data = await response.json();
    const results = Array.isArray(data.results)
      ? data.results.map((item: Record<string, unknown>) => ({
          id: item.id,
          name: item.name,
          admin1: item.admin1,
          country: item.country,
          latitude: item.latitude,
          longitude: item.longitude,
          timezone: item.timezone,
        }))
      : [];

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Location search timed out." }, { status: 504 });
  }
}
