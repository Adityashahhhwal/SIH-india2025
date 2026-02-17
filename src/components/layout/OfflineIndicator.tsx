"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

export function OfflineIndicator() {
    const { isOffline, setOffline } = useAppStore();
    const [show, setShow] = useState(false);

    useEffect(() => {
        function handleOnline() {
            setOffline(false);
            setShow(false);
        }
        function handleOffline() {
            setOffline(true);
            setShow(true);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Initial check
        if (!navigator.onLine) {
            handleOffline();
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [setOffline]);

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-destructive-foreground shadow-lg animate-in slide-in-from-bottom-5">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You are offline. Converting to offline mode...</span>
        </div>
    );
}
