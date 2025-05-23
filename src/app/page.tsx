import Board from "@/components/Board";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Board />
    </div>
  );
}
