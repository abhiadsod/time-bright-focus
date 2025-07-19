import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { parseTimeInput } from "@/lib/timeUtils";

interface CustomTimeInputProps {
  onSetTime: (seconds: number) => void;
  disabled?: boolean;
}

export function CustomTimeInput({ onSetTime, disabled = false }: CustomTimeInputProps) {
  const [timeInput, setTimeInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeInput.trim()) {
      const seconds = parseTimeInput(timeInput);
      if (seconds > 0) {
        onSetTime(seconds);
        setTimeInput("");
      }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
        Custom Time
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
        <Input
          type="text"
          placeholder="5:30 or 90 (minutes)"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          disabled={disabled}
          className="flex-1 h-12 text-center text-lg bg-card border-border"
        />
        <Button
          type="submit"
          disabled={disabled || !timeInput.trim()}
          className="action-button-secondary px-6"
          size="lg"
        >
          <Clock className="h-4 w-4" />
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center mt-2">
        Enter minutes (e.g., "25") or MM:SS format (e.g., "5:30")
      </p>
    </div>
  );
}