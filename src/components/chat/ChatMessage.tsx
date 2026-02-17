"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
    isThinking?: boolean;
}

export function ChatMessage({ role, content, isThinking }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "flex w-full gap-3 p-4",
                isUser ? "flex-row-reverse" : "flex-row",
                !isUser && "bg-muted/50"
            )}
        >
            <Avatar className="h-8 w-8 shrink-0 border border-border">
                {isUser ? (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                ) : (
                    <>
                        <AvatarImage src="/bot-avatar.png" alt="AI" />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                            <Bot className="h-4 w-4" />
                        </AvatarFallback>
                    </>
                )}
            </Avatar>

            <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                        {isUser ? "You" : "Command Center AI"}
                    </span>
                </div>

                <div
                    className={cn(
                        "rounded-lg px-4 py-2 text-sm shadow-sm",
                        isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-card-foreground border border-border",
                        isThinking && "animate-pulse"
                    )}
                >
                    {isThinking ? (
                        <div className="flex items-center gap-1 h-5">
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
