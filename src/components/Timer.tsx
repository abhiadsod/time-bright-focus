import { useState, useEffect, useCallback } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { PresetButtons } from "./PresetButtons";
import { CustomTimeInput } from "./CustomTimeInput";
import { ModeToggle } from "./ModeToggle";
import { LapTimes } from "./LapTimes";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { playNotificationSound } from "@/lib/timeUtils";
import { useToast } from "@/hooks/use-toast";

export function Timer() {
  const [mode, setMode] = useState<"timer" | "stopwatch">("timer");
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const { toast } = useToast();

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (mode === "timer") {
            if (prevTime <= 1) {
              setIsRunning(false);
              playNotificationSound();
              toast({
                title: "Timer Complete!",
                description: "Your timer has finished.",
                duration: 5000,
              });
              return 0;
            }
            return prevTime - 1;
          } else {
            // Stopwatch mode
            return prevTime + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode, toast]);

  const handleStart = useCallback(() => {
    if (mode === "timer" && time === 0) {
      toast({
        title: "Set a time first",
        description: "Please select a preset time or enter a custom duration.",
        variant: "destructive",
      });
      return;
    }
    setIsRunning(true);
  }, [mode, time, toast]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    if (mode === "timer") {
      setTime(initialTime);
    } else {
      setTime(0);
      setLapTimes([]);
    }
  }, [mode, initialTime]);

  const handleModeChange = useCallback((newMode: "timer" | "stopwatch") => {
    setIsRunning(false);
    setMode(newMode);
    setTime(0);
    setInitialTime(0);
    setLapTimes([]);
  }, []);

  const handleSetTime = useCallback((seconds: number) => {
    if (!isRunning) {
      setTime(seconds);
      setInitialTime(seconds);
    }
  }, [isRunning]);

  const handleLap = useCallback(() => {
    if (mode === "stopwatch" && isRunning) {
      setLapTimes((prev) => [time, ...prev]);
    }
  }, [mode, isRunning, time]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent action if user is typing in an input
      if (event.target instanceof HTMLInputElement) return;
      
      if (event.code === "Space") {
        event.preventDefault();
        if (isRunning) {
          handlePause();
        } else {
          handleStart();
        }
      } else if (event.code === "KeyR") {
        event.preventDefault();
        handleReset();
      } else if (event.code === "KeyL" && mode === "stopwatch" && isRunning) {
        event.preventDefault();
        handleLap();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning, handleStart, handlePause, handleReset, handleLap, mode]);

  return (
    <div className="min-h-screen bg-background theme-transition">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            FocusTimer
          </h1>
          <p className="text-muted-foreground text-lg">
            Distraction-free timer and stopwatch for productivity
          </p>
        </div>

        <div className="timer-card max-w-2xl mx-auto">
          <ModeToggle 
            mode={mode} 
            onModeChange={handleModeChange} 
            disabled={isRunning}
          />

          <TimerDisplay 
            time={time} 
            isRunning={isRunning} 
            mode={mode}
          />

          <TimerControls 
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            disabled={mode === "timer" && time === 0 && !isRunning}
          />

          {mode === "stopwatch" && isRunning && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleLap}
                variant="outline"
                className="action-button-secondary"
                size="lg"
              >
                <Flag className="mr-2 h-4 w-4" />
                Lap
              </Button>
            </div>
          )}

          {mode === "timer" && !isRunning && (
            <>
              <PresetButtons 
                onSelectPreset={handleSetTime}
                disabled={isRunning}
              />
              <CustomTimeInput 
                onSetTime={handleSetTime}
                disabled={isRunning}
              />
            </>
          )}

          {mode === "stopwatch" && lapTimes.length > 0 && (
            <LapTimes lapTimes={lapTimes} />
          )}
        </div>

        <div className="text-center mt-12 text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> Start/Pause
            </span>
            <span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">R</kbd> Reset
            </span>
            {mode === "stopwatch" && (
              <span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">L</kbd> Lap
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}