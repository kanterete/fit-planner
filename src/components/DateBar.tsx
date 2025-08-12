type DateBarProps = {
  weekday: string;
  todayTrainingName: string;
};

const DateBar = ({ todayTrainingName, weekday }: DateBarProps) => {
  return (
    <div className="my-4 p-4 md:px-8 mx-auto border-2 border-gray-100 w-full bg-blue-500 text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
      <h2 className="text-2xl md:text-3xl font-semibold">
        🔥 Today: {weekday}
      </h2>
      <h1 className="text-3xl md:text-4xl font-bold">{todayTrainingName}</h1>
    </div>
  );
};

export default DateBar;
