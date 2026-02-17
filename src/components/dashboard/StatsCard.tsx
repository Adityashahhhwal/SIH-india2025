import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
    status?: "default" | "critical" | "warning" | "success";
}

export function StatsCard({ title, value, subtext, icon: Icon, trend, status = "default" }: StatsCardProps) {
    return (
        <Card className={cn(
            "border-l-4 shadow-sm transition-all hover:shadow-md",
            status === "critical" && "border-l-destructive shadow-glow-critical",
            status === "warning" && "border-l-warning",
            status === "success" && "border-l-success",
            status === "default" && "border-l-primary"
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={cn(
                    "h-4 w-4",
                    status === "critical" && "text-destructive",
                    status === "warning" && "text-warning",
                    status === "success" && "text-success",
                    status === "default" && "text-primary"
                )} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-mono">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {subtext}
                </p>
            </CardContent>
        </Card>
    );
}
