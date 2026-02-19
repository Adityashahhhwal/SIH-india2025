"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Updated import
import { ChatMessage } from "./ChatMessage";
import { useChatMutation } from "@/hooks/use-api";

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatMutation = useChatMutation();

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, chatMutation.isPending]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [input]);

    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        if (!input.trim() || chatMutation.isPending) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        const userText = input.trim();
        setInput("");

        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        chatMutation.mutate(userText, {
            onSuccess: (data) => {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: data.reply || data.message || "I'm sorry, I couldn't process that request.",
                };
                setMessages((prev) => [...prev, botMsg]);
            },
            onError: () => {
                const errorMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "⚠️ Connection error. The backend may be offline. Please try again later.",
                };
                setMessages((prev) => [...prev, errorMsg]);
            },
        });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.32))] md:h-full overflow-hidden bg-background rounded-lg">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m) => (
                    <ChatMessage key={m.id} role={m.role} content={m.content} />
                ))}
                {chatMutation.isPending && (
                    <ChatMessage key="thinking" role="assistant" content="" isThinking={true} />
                )}
                <div ref={scrollRef} />
            </div>

            <div className="border-t border-border bg-background p-4">
                <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your emergency query (Shift+Enter for new line)..."
                        className="flex-1 min-h-[44px] max-h-[150px] resize-none py-3"
                        disabled={chatMutation.isPending}
                        aria-label="Chat message input"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="h-11 w-11 shrink-0"
                        disabled={chatMutation.isPending || !input.trim()}
                        aria-label="Send message"
                    >
                        <SendHorizontal className="h-5 w-5" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
