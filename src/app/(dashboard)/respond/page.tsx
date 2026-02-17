"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Navigation, AlertOctagon } from "lucide-react";

// Dynamically import Map to avoid SSR issues with Leaflet
const DisasterMap = dynamic(() => import("@/components/maps/DisasterMap"), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse">Initializing Map Engine...</div>
});

export default function RespondPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.20))] gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Response</h1>
                    <p className="text-muted-foreground">Live situation map and emergency coordination.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive" className="shadow-glow-critical animate-pulse font-bold">
                        <AlertOctagon className="mr-2 h-4 w-4" />
                        Declare Emergency
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">

                {/* Map Section */}
                <Card className="lg:col-span-2 border-border/50 bg-card/50 flex flex-col overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b border-border/50">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Navigation className="h-4 w-4 text-primary" />
                            Live Incident Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 relative">
                        <DisasterMap />

                        {/* Map Overlay Controls (Mock) */}
                        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                            <Button variant="secondary" size="sm" className="shadow-md opacity-90 hover:opacity-100">Layers</Button>
                            <Button variant="secondary" size="sm" className="shadow-md opacity-90 hover:opacity-100">Traffic</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Panel */}
                <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                    {/* Emergency Contacts */}
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Quick Contacts</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button variant="outline" className="justify-start h-auto py-3 border-destructive/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive">
                                <Phone className="mr-3 h-5 w-5" />
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Police / Fire</span>
                                    <span className="text-xs text-muted-foreground">Direct Line • 100</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="justify-start h-auto py-3 border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary">
                                <Phone className="mr-3 h-5 w-5" />
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Ambulance</span>
                                    <span className="text-xs text-muted-foreground">Medical Emergency • 108</span>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Nearby Resources */}
                    <Card className="flex-1 border-border/50 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Nearest Safe Zones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                <div>
                                    <p className="font-sm font-medium">City General Hospital</p>
                                    <p className="text-xs text-muted-foreground">1.2 km • Medical Support</p>
                                </div>
                                <Button size="sm" variant="secondary">Route</Button>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                <div>
                                    <p className="font-sm font-medium">Central Community Hall</p>
                                    <p className="text-xs text-muted-foreground">2.5 km • Shelter • Food</p>
                                </div>
                                <Button size="sm" variant="secondary">Route</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
