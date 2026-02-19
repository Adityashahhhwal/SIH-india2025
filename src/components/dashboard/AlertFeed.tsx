"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { useAlerts } from "@/hooks/use-api";
import type { Alert } from "@/lib/api";

const severityConfig: Record<string, { icon: typeof AlertTriangle; color: string; border: string }> = {
    critical: { icon: AlertCircle, color: "text-destructive", border: "border-l-destructive" },
    warning: { icon: AlertTriangle, color: "text-[#f59e0b]", border: "border-l-[#f59e0b]" },
    info: { icon: Info, color: "text-accent", border: "border-l-accent" },
    success: { icon: CheckCircle, color: "text-secondary", border: "border-l-secondary" },
};

// Fallback mock data for when backend is unavailable
const fallbackAlerts: Alert[] = [
    { _id: "1", type: "critical", message: "Flash Flood Warning: Mumbai coastal areas", source: "IMD", timestamp: new Date().toISOString(), expiresAt: "" },
    { _id: "2", type: "warning", message: "Cyclone watch: Bay of Bengal, Category 2 expected", source: "NDMA", timestamp: new Date(Date.now() - 300000).toISOString(), expiresAt: "" },
    { _id: "3", type: "info", message: "Shelter capacity update: 3 new shelters operational", source: "District Admin", timestamp: new Date(Date.now() - 600000).toISOString(), expiresAt: "" },
    { _id: "4", type: "success", message: "Rescue operation complete: Sector 7 cleared", source: "NDRF", timestamp: new Date(Date.now() - 900000).toISOString(), expiresAt: "" },
    { _id: "5", type: "warning", message: "Heavy rainfall expected in Uttarakhand", source: "IMD", timestamp: new Date(Date.now() - 1200000).toISOString(), expiresAt: "" },
];

function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
}

export function AlertFeed() {
    const { data: alerts, isLoading } = useAlerts(10);
    const displayAlerts = alerts && alerts.length > 0 ? alerts : fallbackAlerts;

    if (isLoading) {
        return (
            <div className="space-y-3" role="status" aria-label="Loading alerts">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-muted/30 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3" role="log" aria-live="polite" aria-label="Real-time alert feed">
            {displayAlerts.map((alert) => {
                const config = severityConfig[alert.type] || severityConfig.info;
                const Icon = config.icon;
                return (
                    <div
                        key={alert._id}
                        className={cn(
                            "flex items-start gap-3 rounded-lg border-l-4 bg-muted/20 p-3 transition-colors hover:bg-muted/40",
                            config.border
                        )}
                    >
                        <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.color)} />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-snug">{alert.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">{alert.source}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground font-mono">{formatTime(alert.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
