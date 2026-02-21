"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window Popup */}
            <div
                className={cn(
                    "mb-4 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 origin-bottom-right",
                    isOpen
                        ? "scale-100 opacity-100 h-[500px] w-[350px] sm:w-[400px]"
                        : "scale-95 opacity-0 h-0 w-[350px] sm:w-[400px] pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold tracking-tight text-foreground">Disaster Assistant</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close chat</span>
                    </Button>
                </div>

                {/* Chat content (only render when open to save resources, or keep mounted for state) */}
                <div className="h-[calc(100%-53px)]">
                    <ChatWindow />
                </div>
            </div>

            {/* Floating Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105",
                    isOpen ? "bg-muted text-foreground hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                <span className="sr-only">Toggle chat assistant</span>
            </Button>
        </div>
    );
}
