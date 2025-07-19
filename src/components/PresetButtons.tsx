import { Button } from "@/components/ui/button";
import { minutesToSeconds } from "@/lib/timeUtils";

interface PresetButtonsProps {
  onSelectPreset: (seconds: number) => void;
  disabled?: boolean;
}

const PRESET_TIMES = [
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "20 min", minutes: 20 },
  { label: "25 min", minutes: 25 },
  { label: "30 min", minutes: 30 },
];

export function PresetButtons({ onSelectPreset, disabled = false }: PresetButtonsProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
        Quick Start
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {PRESET_TIMES.map((preset) => (
          <Button
            key={preset.minutes}
            onClick={() => onSelectPreset(minutesToSeconds(preset.minutes))}
            disabled={disabled}
            className="preset-button h-16 text-base"
            variant="outline"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}