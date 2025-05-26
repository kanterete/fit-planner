import Workout from "@/components/workout/Workout";

export default function AddWorkoutPage() {
  return (
    <main className="p-4 mx-auto my-4 max-w-[1240px] h-fit flex flex-col md:flex-row gap-4 items-center justify-center">
      <Workout />
    </main>
  );
}
