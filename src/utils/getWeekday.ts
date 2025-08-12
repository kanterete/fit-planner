type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const getWeekday = (): Weekday => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as Weekday;
};
