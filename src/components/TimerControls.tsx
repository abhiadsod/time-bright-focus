import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export function TimerControls({ isRunning, onStart, onPause, onReset, disabled = false }: TimerControlsProps) {
  return (
    <div className="flex justify-center items-center gap-4 mb-8">
      {!isRunning ? (
        <Button
          onClick={onStart}
          disabled={disabled}
          className="action-button-primary min-w-[120px]"
          size="lg"
        >
          <Play className="mr-2 h-5 w-5" />
          Start
        </Button>
      ) : (
        <Button
          onClick={onPause}
          className="action-button-primary min-w-[120px]"
          size="lg"
        >
          <Pause className="mr-2 h-5 w-5" />
          Pause
        </Button>
      )}
      
      <Button
        onClick={onReset}
        variant="outline"
        className="action-button-secondary"
        size="lg"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}