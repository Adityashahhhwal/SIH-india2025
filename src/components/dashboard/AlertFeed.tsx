import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertCircle, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

const alerts = [
    { id: 1, type: "critical", message: "Flash flood warning issued for Sector 4.", time: "2m ago" },
    { id: 2, type: "warning", message: "Heavy rainfall expected in next 2 hours.", time: "15m ago" },
    { id: 3, type: "info", message: "Shelter B capacity updated to 85%.", time: "1h ago" },
    { id: 4, type: "success", message: "Power restored in downtown area.", time: "2h ago" },
];

export function AlertFeed() {
    return (
        <div className="rounded-xl border border-border bg-card shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                    <Zap className="h-4 w-4 text-warning" />
                    Live Alerts
                </h3>
                <Badge variant="outline" className="text-xs font-mono">LIVE</Badge>
            </div>
            <ScrollArea className="flex-1">
                <div className="flex flex-col">
                    {alerts.map((alert) => (
                        <div key={alert.id} className={cn(
                            "flex items-start gap-3 p-4 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group",
                            alert.type === "critical" && "bg-destructive/5 hover:bg-destructive/10"
                        )}>
                            <div className="mt-0.5">
                                {alert.type === "critical" && <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />}
                                {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-warning" />}
                                {alert.type === "info" && <AlertCircle className="h-4 w-4 text-primary" />}
                                {alert.type === "success" && <CheckCircle2 className="h-4 w-4 text-success" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none group-hover:text-foreground transition-colors">
                                    {alert.message}
                                </p>
                                <p className="text-xs text-muted-foreground">{alert.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
