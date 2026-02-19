"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    WifiOff,
    Wifi,
    Languages,
    Accessibility,
    Sun,
    Moon,
    Type,
    Volume2,
    Download,
    Check,
} from "lucide-react";

const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", native: "മലയാളം" },
    { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
];

export default function ToolsPage() {
    const [offlineMode, setOfflineMode] = useState(false);
    const [selectedLang, setSelectedLang] = useState("en");
    const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
    const [highContrast, setHighContrast] = useState(false);
    const [screenReader, setScreenReader] = useState(false);

    return (
        <div className="flex flex-col gap-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tools & Settings</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Offline maps, languages, and app configuration.
                </p>
            </div>

            {/* Offline Mode */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <WifiOff className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Offline Mode</h2>
                </div>
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-base">Offline Data & Resources</CardTitle>
                        <CardDescription>
                            Cache essential data for use without internet. Critical during disasters when networks fail.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border border-border p-4">
                            <div className="flex items-center gap-3">
                                {offlineMode ? (
                                    <WifiOff className="h-5 w-5 text-primary" />
                                ) : (
                                    <Wifi className="h-5 w-5 text-secondary" />
                                )}
                                <div>
                                    <p className="font-medium">{offlineMode ? "Offline Mode Active" : "Online Mode"}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {offlineMode
                                            ? "Using cached data. Some features may be limited."
                                            : "Live data connection. All features available."}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant={offlineMode ? "destructive" : "secondary"}
                                size="sm"
                                onClick={() => setOfflineMode(!offlineMode)}
                                aria-label={offlineMode ? "Disable offline mode" : "Enable offline mode"}
                            >
                                {offlineMode ? "Go Online" : "Go Offline"}
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                { label: "First Aid Guides", size: "2.3 MB", cached: true },
                                { label: "Emergency Numbers", size: "0.1 MB", cached: true },
                                { label: "Map Tiles (India)", size: "45 MB", cached: false },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{item.label}</p>
                                        <p className="text-xs text-muted-foreground">{item.size}</p>
                                    </div>
                                    {item.cached ? (
                                        <Check className="h-4 w-4 text-secondary" />
                                    ) : (
                                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Download ${item.label}`}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Language Selection */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Languages className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Language</h2>
                </div>
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-base">Select Interface Language</CardTitle>
                        <CardDescription>Choose your preferred language for the app interface.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                            {languages.map((lang) => (
                                <Button
                                    key={lang.code}
                                    variant={selectedLang === lang.code ? "default" : "outline"}
                                    className="h-auto py-3 flex flex-col gap-1"
                                    onClick={() => setSelectedLang(lang.code)}
                                    aria-label={`Select ${lang.name}`}
                                    aria-pressed={selectedLang === lang.code}
                                >
                                    <span className="text-sm font-semibold">{lang.native}</span>
                                    <span className="text-xs opacity-70">{lang.name}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Accessibility Settings */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-secondary/10">
                        <Accessibility className="h-5 w-5 text-secondary" />
                    </div>
                    <h2 className="text-xl font-semibold">Accessibility</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Font Size */}
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                Text Size
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            {(["normal", "large", "xlarge"] as const).map((size) => (
                                <Button
                                    key={size}
                                    variant={fontSize === size ? "default" : "outline"}
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => setFontSize(size)}
                                    aria-label={`Set text size to ${size}`}
                                    aria-pressed={fontSize === size}
                                >
                                    {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* High Contrast */}
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                {highContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                High Contrast
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant={highContrast ? "default" : "outline"}
                                className="w-full"
                                onClick={() => setHighContrast(!highContrast)}
                                aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
                                aria-pressed={highContrast}
                            >
                                {highContrast ? "Enabled" : "Disabled"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Screen Reader */}
                    <Card className="border-border/50 bg-card/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Volume2 className="h-4 w-4" />
                                Screen Reader Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant={screenReader ? "default" : "outline"}
                                className="w-full"
                                onClick={() => setScreenReader(!screenReader)}
                                aria-label={screenReader ? "Disable screen reader mode" : "Enable screen reader mode"}
                                aria-pressed={screenReader}
                            >
                                {screenReader ? "Enhanced — Active" : "Standard"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
