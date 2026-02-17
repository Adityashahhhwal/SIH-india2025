import { StatsCard } from "@/components/dashboard/StatsCard";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { CapacityBar } from "@/components/dashboard/CapacityBar";
import { Users, Tent, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonitorPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Monitor Dashboard</h1>
                <p className="text-muted-foreground">Real-time situational awareness and resource tracking.</p>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Active Alerts"
                    value="12"
                    subtext="+2 since last hour"
                    icon={AlertTriangle}
                    status="critical"
                />
                <StatsCard
                    title="Shelters Open"
                    value="8"
                    subtext="Total capacity: 1200"
                    icon={Tent}
                    status="default"
                />
                <StatsCard
                    title="People Safe"
                    value="843"
                    subtext="Confirmed check-ins"
                    icon={Users}
                    status="success"
                />
                <StatsCard
                    title="Response Teams"
                    value="5"
                    subtext="Deployed in sector 4"
                    icon={Activity}
                    status="warning"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Main Chart/Map Area (Placeholder for now) */}
                <Card className="col-span-4 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Live Incident Map</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] flex items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20">
                            <span className="text-muted-foreground">Interactive Map Component Loading...</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Alerts Feed */}
                <Card className="col-span-3 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Real-time Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertFeed />
                    </CardContent>
                </Card>

            </div>

            {/* Capacity & Resources Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Shelter Occupancy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CapacityBar label="Central School" value={240} total={300} />
                        <CapacityBar label="Community Hall" value={180} total={200} />
                        <CapacityBar label="North Stadium" value={45} total={500} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
