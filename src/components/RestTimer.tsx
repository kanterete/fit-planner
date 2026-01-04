import React, { useState } from "react";
import { useTimer } from "react-timer-hook";

export default function RestTimer() {
  const [inputMinutes, setInputMinutes] = useState<number>(0);
  const [inputSeconds, setInputSeconds] = useState<number>(30);
  const [expiryTime, setExpiryTime] = useState<Date>(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + inputMinutes * 60 + inputSeconds);
    return time;
  });

  const { minutes, seconds, isRunning, pause, restart } = useTimer({
    expiryTimestamp: expiryTime,
    autoStart: false,
    onExpire: () => alert("Time to workout!"),
  });

  const handleStart = () => {
    const newExpiry = new Date();
    newExpiry.setSeconds(
      newExpiry.getSeconds() + inputMinutes * 60 + inputSeconds
    );
    setExpiryTime(newExpiry);
    restart(newExpiry, true);
  };

  return (
    <div className="text-center p-4 border rounded-md h-fit max-w-sm mx-auto mb-4">
      <h3 className="text-xl mb-2">Rest</h3>

      <div className="text-4xl mb-4">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className="flex justify-center mb-4 gap-2">
        <label>
          Minutes:{" "}
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) =>
              setInputMinutes(Math.max(0, Number(e.target.value)))
            }
            className="border px-2 py-1 w-16"
            min={0}
          />
        </label>

        <label>
          Seconds:{" "}
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (val < 0) val = 0;
              if (val > 59) val = 59;
              setInputSeconds(val);
            }}
            className="border px-2 py-1 w-16"
            min={0}
            max={59}
          />
        </label>
      </div>

      <div className="flex justify-center gap-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Start
          </button>
        ) : (
          <button onClick={pause} className="bg-yellow-500 px-4 py-2 rounded">
            Pause
          </button>
        )}
        <button
          onClick={() => restart(expiryTime)}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
