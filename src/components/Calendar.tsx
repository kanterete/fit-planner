import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WeekDay, WorkoutPlan } from "@/types/types";
import { addDays, format } from "date-fns";

type CalendarProps = {
  workoutPlan: WorkoutPlan;
  handleScheduleChange: (val: string, day: WeekDay, id: string) => void;
  weekdaySelections: Partial<Record<WeekDay, string>>;
};

export default function Calendar({
  workoutPlan,
  handleScheduleChange,
  weekdaySelections,
}: CalendarProps) {
  const today = format(new Date(), "EEEE") as WeekDay;

  const getNext7Days = () => {
    return [...Array(7)].map((_, i) => {
      const date = addDays(new Date(), i);
      return {
        name: format(date, "EEEE") as WeekDay,
        short: format(date, "EE"),
        day: format(date, "d"),
        month: format(date, "MMM"),
        date: format(date, "dd.MM.yy"),
        fullDate: date,
      };
    });
  };

  const currentWeek = getNext7Days();
  const todayIndex = currentWeek.findIndex((day) => day.name === today);

  const reoderedWeek = [
    ...currentWeek.slice(todayIndex),
    ...currentWeek.slice(0, todayIndex),
  ];

  return (
    <Carousel className="md:w-full mb-4">
      <CarouselContent>
        {workoutPlan &&
          reoderedWeek.map((day, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div>
                <Card
                  className={`${
                    day.name === today
                      ? "bg-primary text-white"
                      : "bg-accent text-black"
                  }`}
                >
                  <CardContent>
                    <p className="text-xl mb-2">{day.name}</p>
                    <p className="text-5xl mb-4">{day.day}</p>
                    <div>
                      <Select
                        value={weekdaySelections[day.name] ?? "Rest"}
                        onValueChange={(val) =>
                          handleScheduleChange(val, day.name, workoutPlan.id)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Change?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Trainings</SelectLabel>
                            <SelectItem value="Rest">Rest</SelectItem>
                            {workoutPlan.trainings.map((training) => (
                              <SelectItem
                                key={training.id}
                                value={training.name}
                              >
                                {training.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
