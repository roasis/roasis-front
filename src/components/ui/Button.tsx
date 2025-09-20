"use client";

import { cn } from "@/src/utils/cn";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn("hover:cursor-pointer", disabled && "opacity-50")}
        >
            {children}
        </button>
    );
}
