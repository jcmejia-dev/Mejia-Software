"use client";

import { Cloud, CloudLightning, CloudRain, CloudSun, LocateFixed, MapPin, Search, Sun, Wind } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Weather = { location:string; timezone:string; observedAt:string; temperature:number; feelsLike:number; humidity:number; windSpeed:number; weatherCode:number; condition:string; isDay:boolean; high:number; low:number };
type LocationResult = { id:number; name:string; admin1?:string; country?:string; latitude:number; longitude:number; timezone?:string };
type Scene = "sunny" | "windy" | "rainy" | "storm" | "cloudy";

function sceneFor(weather: Weather): Scene {
  if ([95,96,99].includes(weather.weatherCode)) return "storm";
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(weather.weatherCode)) return "rainy";
  if (weather.windSpeed >= 22) return "windy";
  if ([0,1].includes(weather.weatherCode)) return "sunny";
  return "cloudy";
}

function WeatherGlyph({ scene }: { scene: Scene }) {
  const props = { size: 46, strokeWidth: 1.45, "aria-hidden": true } as const;
  if (scene === "sunny") return <Sun {...props}/>;
  if (scene === "windy") return <Wind {...props}/>;
  if (scene === "rainy") return <CloudRain {...props}/>;
  if (scene === "storm") return <CloudLightning {...props}/>;
  return <CloudSun {...props}/>;
}

export function WeatherWidget() {
  const [weather,setWeather]=useState<Weather|null>(null); const [query,setQuery]=useState(""); const [results,setResults]=useState<LocationResult[]>([]); const [loading,setLoading]=useState(false); const [searching,setSearching]=useState(false); const [error,setError]=useState<string|null>(null); const [localTime,setLocalTime]=useState("");
  const loadWeather=useCallback(async(latitude:number,longitude:number,label?:string)=>{setLoading(true);setError(null);setResults([]);try{const params=new URLSearchParams({lat:String(latitude),lon:String(longitude)});if(label)params.set("label",label);const response=await fetch(`/api/weather?${params}`);const data=await response.json();if(!response.ok)throw new Error(data.error??"Weather is unavailable.");setWeather(data)}catch(caught){setWeather(null);setError(caught instanceof Error?caught.message:"Weather is unavailable.")}finally{setLoading(false)}},[]);
  useEffect(()=>{const saved=window.localStorage.getItem("mejia-weather-city");if(!saved)return;let timer:number|undefined;try{const location=JSON.parse(saved) as {latitude:number;longitude:number;label:string};timer=window.setTimeout(()=>void loadWeather(location.latitude,location.longitude,location.label),0)}catch{window.localStorage.removeItem("mejia-weather-city")}return()=>{if(timer!==undefined)window.clearTimeout(timer)}},[loadWeather]);
  useEffect(()=>{if(!weather?.timezone)return;const update=()=>{try{setLocalTime(new Intl.DateTimeFormat(undefined,{timeZone:weather.timezone,hour:"numeric",minute:"2-digit",weekday:"short"}).format(new Date()))}catch{setLocalTime("")}};const initial=window.setTimeout(update,0);const timer=window.setInterval(update,60000);return()=>{window.clearTimeout(initial);window.clearInterval(timer)}},[weather?.timezone]);
  const useMyLocation=()=>{setError(null);if(!navigator.geolocation){setError("This browser does not support location access. Search for a city instead.");return}setLoading(true);navigator.geolocation.getCurrentPosition(p=>void loadWeather(p.coords.latitude,p.coords.longitude),()=>{setLoading(false);setError("Location permission was denied or unavailable. Search for a city instead.")},{enableHighAccuracy:false,timeout:8000,maximumAge:600000})};
  const searchCity=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();if(query.trim().length<2)return;setSearching(true);setError(null);try{const response=await fetch(`/api/geocode?q=${encodeURIComponent(query.trim())}`);const data=await response.json();if(!response.ok)throw new Error(data.error??"City search is unavailable.");setResults(data.results??[]);if(!data.results?.length)setError("No matching city was found.")}catch(caught){setResults([]);setError(caught instanceof Error?caught.message:"City search is unavailable.")}finally{setSearching(false)}};
  const selectCity=(location:LocationResult)=>{const label=[location.name,location.admin1,location.country].filter(Boolean).join(", ");window.localStorage.setItem("mejia-weather-city",JSON.stringify({latitude:location.latitude,longitude:location.longitude,label}));setQuery("");void loadWeather(location.latitude,location.longitude,label)};
  const summary=useMemo(()=>weather?`${Math.round(weather.low)}° / ${Math.round(weather.high)}°`:null,[weather]); const scene=weather?sceneFor(weather):"cloudy";

  return <section className={`weather-card weather-scene scene-${scene}`} aria-labelledby="weather-title">
    <div className="weather-atmosphere" aria-hidden="true"><div className="weather-orbit orbit-one"/><div className="weather-orbit orbit-two"/><div className="weather-sun"/><div className="weather-cloud cloud-one"/><div className="weather-cloud cloud-two"/><div className="weather-wind wind-one"/><div className="weather-wind wind-two"/><div className="weather-rain">{Array.from({length:16},(_,i)=><i key={i}/>)}</div><div className="weather-flash"/></div>
    <div className="weather-content">
      <div className="weather-heading"><div><p className="eyebrow">Live atmosphere</p><h3 id="weather-title">Weather where you are</h3></div><div className="weather-glyph"><WeatherGlyph scene={scene}/></div></div>
      {loading?<div className="weather-state" role="status">Reading the atmosphere…</div>:null}
      {!loading&&weather?<div className="weather-data"><div className="weather-location"><MapPin size={15}/>{weather.location}</div><div className="temperature-row"><strong>{Math.round(weather.temperature)}°</strong><div><b>{weather.condition}</b><span>{scene === "windy" ? "Wind is shaping the scene" : "Live conditions"}</span></div></div><div className="weather-metrics"><span>Feels {Math.round(weather.feelsLike)}°</span><span>Humidity {Math.round(weather.humidity)}%</span><span><Wind size={13}/>{Math.round(weather.windSpeed)} km/h</span><span>Today {summary}</span></div>{localTime?<div className="weather-time">Local time · {localTime}</div>:null}</div>:null}
      {!loading&&!weather?<div className="weather-state"><strong>Bring your local sky into the page.</strong><p>Use your location or choose a city. The scene changes for sun, wind, rain and thunderstorms using real weather data.</p></div>:null}
      {error?<p className="weather-error" role="alert">{error}</p>:null}
      <div className="weather-controls"><button className="location-button" type="button" onClick={useMyLocation} disabled={loading}><LocateFixed size={15}/>Use my location</button><form className="city-search" onSubmit={searchCity}><label className="sr-only" htmlFor="weather-city">Search city</label><input id="weather-city" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search city" autoComplete="off"/><button type="submit" aria-label="Search city" disabled={searching}><Search size={16}/></button></form></div>
      {results.length?<div className="city-results" role="list" aria-label="Location search results">{results.map(result=><button key={result.id} type="button" onClick={()=>selectCity(result)}><strong>{result.name}</strong><span>{[result.admin1,result.country].filter(Boolean).join(", ")}</span></button>)}</div>:null}
      <p className="weather-credit">Live weather: Open-Meteo · Device-coordinate place names: OpenStreetMap contributors.</p>
    </div>
  </section>;
}
