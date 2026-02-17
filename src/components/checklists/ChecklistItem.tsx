"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
    id: string;
    label: string;
    subtext?: string;
    isCompleted?: boolean;
}

export function ChecklistItem({ id, label, subtext, isCompleted = false }: ChecklistItemProps) {
    const [checked, setChecked] = useState(isCompleted);

    return (
        <div
            onClick={() => setChecked(!checked)}
            className={cn(
                "flex items-start gap-4 rounded-xl border p-4 transition-all cursor-pointer select-none",
                checked
                    ? "bg-secondary/10 border-secondary"
                    : "bg-card border-border hover:bg-accent/50"
            )}
        >
            <div
                className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked
                        ? "bg-secondary border-secondary text-secondary-foreground"
                        : "border-muted-foreground text-transparent"
                )}
            >
                <Check className="h-4 w-4" strokeWidth={3} />
            </div>
            <div className="flex-1 space-y-1">
                <p
                    className={cn(
                        "font-medium leading-none transition-all",
                        checked && "text-muted-foreground line-through"
                    )}
                >
                    {label}
                </p>
                {subtext && <p className="text-sm text-muted-foreground">{subtext}</p>}
            </div>
        </div>
    );
}
