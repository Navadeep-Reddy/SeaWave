import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
    value: number[];
    onValueChange: (value: number[]) => void;
    max?: number;
    min?: number;
    step?: number;
    className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            className,
            value,
            onValueChange,
            max = 100,
            min = 0,
            step = 1,
            ...props
        },
        ref
    ) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onValueChange([parseInt(e.target.value)]);
        };

        return (
            <input
                ref={ref}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={handleChange}
                className={cn(
                    "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ",
                    "focus:outline-none  ",
                    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
                    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-textBlue [&::-webkit-slider-thumb]:cursor-pointer",
                    "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full",
                    "[&::-moz-range-thumb]:bg-textBlue [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none",
                    className
                )}
                {...props}
            />
        );
    }
);
Slider.displayName = "Slider";

export { Slider };
