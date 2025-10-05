import { WeekDay } from "@/types/types";

export const getWeekday = (): WeekDay => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as WeekDay;
};
