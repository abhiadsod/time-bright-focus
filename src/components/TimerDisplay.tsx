import { formatTime } from "@/lib/timeUtils";

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  mode: "timer" | "stopwatch";
}

export function TimerDisplay({ time, isRunning, mode }: TimerDisplayProps) {
  return (
    <div className="text-center mb-8">
      <div 
        className={`timer-display ${isRunning ? 'text-primary' : 'text-foreground'} transition-colors duration-300`}
        role="timer"
        aria-live="polite"
        aria-label={`${mode === 'timer' ? 'Timer' : 'Stopwatch'}: ${formatTime(time)}`}
      >
        {formatTime(time)}
      </div>
      <div className="text-muted-foreground text-lg md:text-xl mt-2 font-medium">
        {mode === "timer" ? "Timer" : "Stopwatch"}
      </div>
    </div>
  );
}