"use client";

import { useAlerts } from "@/hooks/use-api";
import type { Alert } from "@/lib/api";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle, AlertCircle, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// No external formatTime needed, using inline

const severityConfig: Record<string, { icon: typeof AlertTriangle; color: string; border: string; bg: string }> = {
    critical: { icon: AlertCircle, color: "text-destructive", border: "border-l-destructive", bg: "bg-destructive/10" },
    warning: { icon: AlertTriangle, color: "text-[#f59e0b]", border: "border-l-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
    info: { icon: Info, color: "text-accent", border: "border-l-accent", bg: "bg-accent/10" },
    success: { icon: CheckCircle, color: "text-secondary", border: "border-l-secondary", bg: "bg-secondary/10" },
};

// Fallback mock data for when backend is unavailable
const fallbackAlerts: Alert[] = [
    { _id: "1", type: "critical", message: "Flash Flood Warning: Mumbai coastal areas", source: "IMD", timestamp: new Date().toISOString(), expiresAt: "" },
    { _id: "2", type: "warning", message: "Cyclone watch: Bay of Bengal, Category 2 expected", source: "NDMA", timestamp: new Date(Date.now() - 300000).toISOString(), expiresAt: "" },
    { _id: "3", type: "info", message: "Shelter capacity update: 3 new shelters operational", source: "District Admin", timestamp: new Date(Date.now() - 600000).toISOString(), expiresAt: "" },
    { _id: "4", type: "success", message: "Rescue operation complete: Sector 7 cleared", source: "NDRF", timestamp: new Date(Date.now() - 900000).toISOString(), expiresAt: "" },
    { _id: "5", type: "warning", message: "Heavy rainfall expected in Uttarakhand", source: "IMD", timestamp: new Date(Date.now() - 1200000).toISOString(), expiresAt: "" },
    { _id: "6", type: "critical", message: "Evacuation order issued for low-lying areas in Chennai", source: "State Govt", timestamp: new Date(Date.now() - 3600000).toISOString(), expiresAt: "" },
    { _id: "7", type: "info", message: "Relief materials dispatched to relief camps in Kerala", source: "NGO Partner", timestamp: new Date(Date.now() - 7200000).toISOString(), expiresAt: "" }
];

function formatTimeInline(timestamp: string) {
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

export default function AlertsPage() {
    const { data: alerts, isLoading } = useAlerts(100);
    const [filter, setFilter] = useState<string | null>(null);

    const displayAlerts = alerts && alerts.length > 0 ? alerts : fallbackAlerts;
    const filteredAlerts = filter ? displayAlerts.filter(a => a.type === filter) : displayAlerts;

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Link href="/monitor">
                        <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Monitor</span>
                        </Button>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">System Alerts</h1>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Comprehensive log of all emergency alerts, warnings, and informational broadcasts.
                </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                    variant={filter === null ? "default" : "outline"}
                    onClick={() => setFilter(null)}
                    className="rounded-full shrink-0"
                    size="sm"
                >
                    <Filter className="h-4 w-4 mr-2" />
                    All Alerts
                </Button>
                <Button
                    variant={filter === "critical" ? "default" : "outline"}
                    onClick={() => setFilter("critical")}
                    className="rounded-full shrink-0 border-destructive/50 text-destructive hover:bg-destructive/10"
                    size="sm"
                >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Critical
                </Button>
                <Button
                    variant={filter === "warning" ? "default" : "outline"}
                    onClick={() => setFilter("warning")}
                    className="rounded-full shrink-0 border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10"
                    size="sm"
                >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Warnings
                </Button>
                <Button
                    variant={filter === "info" ? "default" : "outline"}
                    onClick={() => setFilter("info")}
                    className="rounded-full shrink-0 border-accent/50 text-accent hover:bg-accent/10"
                    size="sm"
                >
                    <Info className="h-4 w-4 mr-2" />
                    Info
                </Button>
                <Button
                    variant={filter === "success" ? "default" : "outline"}
                    onClick={() => setFilter("success")}
                    className="rounded-full shrink-0 border-secondary/50 text-secondary hover:bg-secondary/10"
                    size="sm"
                >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolved
                </Button>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="space-y-4 grid mt-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-24 rounded-lg bg-muted/30 animate-pulse" />
                        ))}
                    </div>
                ) : filteredAlerts.length === 0 ? (
                    <div className="p-12 text-center rounded-xl border border-dashed border-border bg-muted/20">
                        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No alerts found</h3>
                        <p className="text-muted-foreground mt-1">There are currently no alerts matching this filter.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredAlerts.map((alert) => {
                            const config = severityConfig[alert.type] || severityConfig.info;
                            const Icon = config.icon;

                            return (
                                <div
                                    key={alert._id}
                                    className={cn(
                                        "flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border-l-4 border-y border-r bg-card p-4 sm:p-5 transition-colors hover:bg-muted/30",
                                        "border-y-border border-r-border",
                                        config.border
                                    )}
                                >
                                    <div className={cn("flex-shrink-0 p-3 rounded-full mt-1 sm:mt-0 self-start sm:self-center w-12 h-12 flex items-center justify-center", config.bg)}>
                                        <Icon className={cn("h-6 w-6", config.color)} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                                            <h3 className="text-base sm:text-lg font-semibold leading-tight">{alert.message}</h3>
                                            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap hidden sm:inline-block pt-1">
                                                {formatTimeInline(alert.timestamp)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border">
                                                {alert.source}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                {alert.type}
                                            </span>

                                            {/* Mobile timestamp */}
                                            <span className="text-xs font-mono text-muted-foreground sm:hidden ml-auto">
                                                {formatTimeInline(alert.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
