import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin } from "lucide-react";

export function MobileEmergencyBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
            <Button variant="ghost" className="flex flex-col gap-1 text-xs text-muted-foreground h-full py-2">
                <MapPin className="h-5 w-5" />
                <span>Map</span>
            </Button>

            <Button variant="destructive" size="lg" className="rounded-full h-12 w-12 p-0 shadow-lg shadow-destructive/50 -translate-y-4 border-4 border-background">
                <span className="sr-only">SOS</span>
                <span className="font-bold text-lg">SOS</span>
            </Button>

            <Button variant="ghost" className="flex flex-col gap-1 text-xs text-muted-foreground h-full py-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Alerts</span>
            </Button>
        </div>
    );
}
