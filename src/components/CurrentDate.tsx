import { TrainingDay } from "@/types/types";

type CurrentDateProps = {
  today: string;
  hasTrainingToday: TrainingDay | undefined;
};

const CurrentDate = ({ today, hasTrainingToday }: CurrentDateProps) => {
  function getDayName(dateString: string): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  }
  const dayName = getDayName(today);
  const trainingType = hasTrainingToday ? hasTrainingToday.name : null;

  return (
    <div className="my-4 p-4 md:px-8 mx-auto border-2 border-gray-100 w-full bg-blue-500 text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
      <h2 className="text-2xl md:text-3xl">
        🔥 Today: {dayName}, {today}
      </h2>
      <h1 className="text-3xl md:text-4xl">
        {hasTrainingToday ? trainingType : "Nothing planned for this day"}
      </h1>
    </div>
  );
};

export default CurrentDate;
