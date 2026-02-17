"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Shield, Map, BookOpen } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-20 md:pt-24 md:pb-32">
            <div className="container relative z-10 flex flex-col items-center text-center">

                {/* Status Badge */}
                <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                    System Operational • Monitoring Active
                </div>

                {/* Main Heading */}
                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                    Disaster Response <br className="hidden sm:inline" />
                    <span className="text-primary">Command Center</span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    AI-powered coordination for rapid response. Real-time alerts, offline resources, and community reporting in one unified platform.
                </p>

                {/* Action Grid ("What do I do right now?") */}
                <div className="mt-10 grid w-full max-w-lg grid-cols-1 gap-4 sm:max-w-3xl sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">

                    <Link href="/respond" className="group">
                        <Button variant="destructive" className="w-full h-auto flex flex-col items-center gap-2 py-6 text-lg shadow-glow-critical hover:scale-105 transition-transform">
                            <AlertCircle className="h-8 w-8" />
                            <span>Emergency</span>
                        </Button>
                    </Link>

                    <Link href="/monitor" className="group">
                        <Button variant="outline" className="w-full h-auto flex flex-col items-center gap-2 py-6 text-lg border-primary/20 hover:border-primary hover:bg-primary/10 transition-all">
                            <Map className="h-8 w-8 text-primary" />
                            <span>Live Map</span>
                        </Button>
                    </Link>

                    <Link href="/prepare" className="group">
                        <Button variant="secondary" className="w-full h-auto flex flex-col items-center gap-2 py-6 text-lg hover:bg-secondary/80 transition-all">
                            <Shield className="h-8 w-8 text-secondary-foreground" />
                            <span>Prepare</span>
                        </Button>
                    </Link>

                    <Link href="/recover" className="group">
                        <Button variant="ghost" className="w-full h-auto flex flex-col items-center gap-2 py-6 text-lg bg-card hover:bg-accent transition-all">
                            <BookOpen className="h-8 w-8" />
                            <span>Resources</span>
                        </Button>
                    </Link>

                </div>
            </div>

            {/* Background Decorative Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    );
}
