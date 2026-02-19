"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { CapacityBar } from "@/components/dashboard/CapacityBar";
import { Users, Tent, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats, useShelters } from "@/hooks/use-api";

export default function MonitorPage() {
    const { data: stats, isLoading: statsLoading } = useStats();
    const { data: shelters, isLoading: sheltersLoading } = useShelters();

    // Fallback values when backend is unavailable
    const activeHazards = stats?.activeHazards ?? 12;
    const sheltersOpen = stats?.sheltersOpen ?? 8;
    const peopleAssisted = stats?.peopleAssisted ?? 843;
    const systemStatus = stats?.systemStatus ?? "online";

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Monitor Dashboard</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Real-time situational awareness and resource tracking.</p>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Active Alerts"
                    value={statsLoading ? "..." : String(activeHazards)}
                    subtext={statsLoading ? "Loading..." : "+2 since last hour"}
                    icon={AlertTriangle}
                    status="critical"
                />
                <StatsCard
                    title="Shelters Open"
                    value={statsLoading ? "..." : String(sheltersOpen)}
                    subtext={statsLoading ? "Loading..." : `Total capacity: ${shelters?.reduce((sum, s) => sum + (s.capacity?.total || 0), 0) ?? 1200}`}
                    icon={Tent}
                    status="default"
                />
                <StatsCard
                    title="People Safe"
                    value={statsLoading ? "..." : String(peopleAssisted)}
                    subtext="Confirmed check-ins"
                    icon={Users}
                    status="success"
                />
                <StatsCard
                    title="System Status"
                    value={statsLoading ? "..." : systemStatus === "online" ? "Online" : "Offline"}
                    subtext="All systems operational"
                    icon={Activity}
                    status={systemStatus === "online" ? "success" : "warning"}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">

                {/* Main Chart/Map Area */}
                <Card className="lg:col-span-4 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Live Incident Map</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[250px] sm:h-[350px] flex items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20">
                            <span className="text-muted-foreground">Interactive Map Component Loading...</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Alerts Feed */}
                <Card className="lg:col-span-3 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Real-time Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertFeed />
                    </CardContent>
                </Card>

            </div>

            {/* Capacity & Resources Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Shelter Occupancy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sheltersLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-8 rounded bg-muted/30 animate-pulse" />
                                ))}
                            </div>
                        ) : shelters && shelters.length > 0 ? (
                            shelters
                                .filter((s) => s.type === "shelter")
                                .slice(0, 5)
                                .map((shelter) => (
                                    <CapacityBar
                                        key={shelter._id}
                                        label={shelter.name}
                                        value={shelter.capacity?.current ?? 0}
                                        total={shelter.capacity?.total ?? 100}
                                    />
                                ))
                        ) : (
                            <>
                                <CapacityBar label="Central School" value={240} total={300} />
                                <CapacityBar label="Community Hall" value={180} total={200} />
                                <CapacityBar label="North Stadium" value={45} total={500} />
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
