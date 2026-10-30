import { NextRequest, NextResponse } from "next/server";
import { conditionFromCode } from "@/lib/weather";

async function reverseLocation(latitude: number, longitude: number) {
  try {
    const params = new URLSearchParams({
      format: "jsonv2",
      lat: String(latitude),
      lon: String(longitude),
      zoom: "10",
      addressdetails: "1",
    });

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      headers: {
        "User-Agent": "MejiaSoftware/0.1 (+https://github.com/jcmejia-dev/Mejia-Software)",
        "Accept-Language": "en",
      },
      signal: AbortSignal.timeout(3500),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return "Your location";
    const data = await response.json();
    const address = data.address ?? {};
    return (
      address.city ??
      address.town ??
      address.municipality ??
      address.village ??
      address.county ??
      "Your location"
    );
  } catch {
    return "Your location";
  }
}

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("lat"));
  const longitude = Number(request.nextUrl.searchParams.get("lon"));
  const suppliedLabel = request.nextUrl.searchParams.get("label")?.trim().slice(0, 100);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json({ error: "Invalid coordinates." }, { status: 400 });
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),
    daily: "temperature_2m_max,temperature_2m_min",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
    forecast_days: "1",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Weather provider is unavailable." }, { status: 502 });
    }

    const data = await response.json();
    const code = Number(data.current?.weather_code ?? -1);
    const location = suppliedLabel || (await reverseLocation(latitude, longitude));

    return NextResponse.json({
      location,
      timezone: data.timezone,
      observedAt: data.current?.time,
      temperature: data.current?.temperature_2m,
      feelsLike: data.current?.apparent_temperature,
      humidity: data.current?.relative_humidity_2m,
      windSpeed: data.current?.wind_speed_10m,
      weatherCode: code,
      condition: conditionFromCode(code),
      isDay: Boolean(data.current?.is_day),
      high: data.daily?.temperature_2m_max?.[0],
      low: data.daily?.temperature_2m_min?.[0],
    });
  } catch {
    return NextResponse.json({ error: "Weather request timed out." }, { status: 504 });
  }
}
