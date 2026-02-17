"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello. I am the Disaster Response AI. Status is operational. How can I assist you right now?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        // Simulate API delay (Replace with real mutation later)
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I have received your request. Accessing protocol... (This is a mock response)",
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsLoading(false);
        }, 1500);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] md:h-full overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col pb-4">
                    {messages.map((m) => (
                        <ChatMessage key={m.id} role={m.role} content={m.content} />
                    ))}
                    {isLoading && <ChatMessage role="assistant" content="" isThinking={true} />}
                    <div ref={scrollRef} />
                </div>
            </div>

            <div className="border-t border-border bg-background p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your emergency query..."
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <SendHorizontal className="h-5 w-5" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
