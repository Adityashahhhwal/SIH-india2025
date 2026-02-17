import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
    return (
        <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Command Assistant</h1>
                    <p className="text-sm text-muted-foreground">Real-time operational support.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                    <span className="text-xs font-medium text-secondary">Online</span>
                </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <ChatWindow />
            </div>
        </div>
    );
}
