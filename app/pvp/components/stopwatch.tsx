"use client";
import { useStopwatch } from "react-timer-hook";

type Props = {
  seconds: number;
  minutes: number;
  isRunning: boolean;
};

export const Stopwatch = ({ seconds, minutes, isRunning }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <p>Timer:</p>
      {isRunning && (
        <div>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      )}
    </div>
  );
};
