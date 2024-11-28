"use client";

import useDebounce from "@/hooks/useDebounce";
import { RgbColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Controls } from "@/types/types";

export default function ControlsBar({
  controls,
  setControls,
}: {
  controls: Controls;
  setControls: (newControls: Controls) => void;
}) {
  const debouncedLowColorValues = useDebounce(controls.lowColor, 500);
  const debouncedHighColorValues = useDebounce(controls.highColor, 500);

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex gap-8 p-4">
      <div className="flex flex-col">
        <label htmlFor="nScale">Noise Scale: {controls.nScale}</label>
        <input
          type="range"
          min={0}
          max={3}
          step={0.01}
          id="nScale"
          value={controls.nScale}
          onChange={(e) =>
            setControls({
              ...controls,
              nScale: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="zPosScale">
          Z Position Scale: {controls.zPosScale}
        </label>
        <input
          type="range"
          min={0}
          max={3}
          step={0.01}
          id="zPosScale"
          value={controls.zPosScale}
          onChange={(e) =>
            setControls({
              ...controls,
              zPosScale: Number(e.target.value),
            })
          }
        />
      </div>
      <Popover>
        <PopoverTrigger className="rounded-sm border px-4 transition-colors hover:bg-primary/20">
          Low Amplitude Colors
        </PopoverTrigger>
        <PopoverContent className="h-[334px] w-[334px]">
          <RgbColorPicker
            color={debouncedLowColorValues}
            style={{ width: "300px", height: "300px" }}
            className="z-20"
            onChange={(e) => setControls({ ...controls, lowColor: e })}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger className="rounded-sm border px-4 transition-colors hover:bg-primary/20">
          High Amplitude Colors
        </PopoverTrigger>
        <PopoverContent className="h-[334px] w-[334px]">
          <RgbColorPicker
            color={debouncedHighColorValues}
            style={{ width: "300px", height: "300px" }}
            className="z-20"
            onChange={(e) => setControls({ ...controls, highColor: e })}
          />
        </PopoverContent>
      </Popover>
      <div className="flex flex-col">
        <label htmlFor="lightnessMult">
          Lightness Multiplier: {controls.lightnessMult}
        </label>
        <input
          type="range"
          min={0}
          max={3}
          step={0.01}
          id="lightnessMult"
          value={controls.lightnessMult}
          onChange={(e) =>
            setControls({
              ...controls,
              lightnessMult: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}
