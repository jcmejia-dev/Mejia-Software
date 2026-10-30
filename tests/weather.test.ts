import { describe, expect, it } from "vitest";
import { conditionFromCode } from "../lib/weather";

describe("conditionFromCode", () => {
  it.each([
    [0, "Clear sky"],
    [2, "Partly cloudy"],
    [3, "Overcast"],
    [45, "Foggy"],
    [55, "Drizzle"],
    [63, "Rain"],
    [75, "Snow"],
    [95, "Thunderstorm"],
    [999, "Weather unavailable"],
  ])("maps WMO code %s to %s", (code, expected) => {
    expect(conditionFromCode(code)).toBe(expected);
  });
});
