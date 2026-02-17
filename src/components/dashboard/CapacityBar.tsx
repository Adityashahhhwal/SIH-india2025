import { Progress } from "@/components/ui/progress";

interface CapacityBarProps {
    label: string;
    value: number;
    total: number;
    color?: string;
}

export function CapacityBar({ label, value, total }: CapacityBarProps) {
    const percentage = Math.round((value / total) * 100);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">{label}</span>
                <span className="font-mono font-bold">{value}/{total}</span>
            </div>
            <Progress value={percentage} className="h-2" />
        </div>
    );
}
