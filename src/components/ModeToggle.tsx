import { Timer, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  mode: "timer" | "stopwatch";
  onModeChange: (mode: "timer" | "stopwatch") => void;
  disabled?: boolean;
}

export function ModeToggle({ mode, onModeChange, disabled = false }: ModeToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-secondary rounded-[var(--radius)] p-1 flex">
        <Button
          onClick={() => onModeChange("timer")}
          disabled={disabled}
          variant={mode === "timer" ? "default" : "ghost"}
          className={`px-6 py-3 font-medium rounded-[calc(var(--radius)-2px)] transition-all duration-200 ${
            mode === "timer" 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Timer className="mr-2 h-4 w-4" />
          Timer
        </Button>
        <Button
          onClick={() => onModeChange("stopwatch")}
          disabled={disabled}
          variant={mode === "stopwatch" ? "default" : "ghost"}
          className={`px-6 py-3 font-medium rounded-[calc(var(--radius)-2px)] transition-all duration-200 ${
            mode === "stopwatch" 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="mr-2 h-4 w-4" />
          Stopwatch
        </Button>
      </div>
    </div>
  );
}