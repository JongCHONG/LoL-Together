import { WeekDays } from "../enums/weekDays";
import { Availabilities } from "../types/api";

export const formatAvailabilities = (data: {
  availabilities?: Availabilities;
}) =>
  data?.availabilities
    ? Object.entries(data.availabilities)
        .filter(([_, value]) => value)
        .map(([key]) => WeekDays[key as keyof typeof WeekDays] || key)
        .join(", ") || "N/A"
    : "N/A";
