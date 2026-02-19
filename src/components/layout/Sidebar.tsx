"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; //
import {
    BarChart3,
    Map,
    ShieldAlert,
    BookOpen,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const sidebarItems = [
    { name: "Overview", href: "/monitor", icon: BarChart3 },
    { name: "Live Map", href: "/respond", icon: Map },
    { name: "Alerts", href: "/monitor/alerts", icon: ShieldAlert },
    { name: "Resources", href: "/recover", icon: BookOpen },
    { name: "Settings", href: "/tools", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Desktop Sidebar
    const DesktopSidebar = (
        <div className="hidden border-r border-border bg-card/50 md:block md:w-64 md:shrink-0 lg:w-72">
            <div className="flex h-full flex-col gap-2">
                <div className="flex h-16 items-center border-b border-border px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                        <span>Command<span className="text-primary">Center</span></span>
                    </Link>
                </div>
                <ScrollArea className="flex-1 px-4 py-4">
                    <nav className="flex flex-col gap-2">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>
                <div className="border-t border-border p-4">
                    {/* User Profile / Logout Placeholder */}
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">U</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-foreground">User Name</p>
                            <p className="truncate text-xs">user@example.com</p>
                        </div>
                        <LogOut className="h-4 w-4 cursor-pointer hover:text-destructive" />
                    </div>
                </div>
            </div>
        </div>
    );

    // Mobile Sidebar (Sheet)
    const MobileSidebar = (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 border-r border-border bg-card">
                <SheetTitle className="sr-only">Dashboard Sidebar</SheetTitle>
                <SheetDescription className="sr-only">Dashboard navigation links</SheetDescription>
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center border-b border-border px-6">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
                            <ShieldAlert className="h-6 w-6 text-primary" />
                            <span>Command<span className="text-primary">Center</span></span>
                        </Link>
                    </div>
                    <ScrollArea className="flex-1 px-4 py-4">
                        <nav className="flex flex-col gap-2">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );

    return (
        <>
            {DesktopSidebar}
            {/* Mobile Header with Hamburger */}
            <div className="flex items-center px-4 py-2 border-b border-border bg-card/50 md:hidden sticky top-0 z-30 backdrop-blur">
                {MobileSidebar}
                <span className="font-semibold text-lg">Command Center</span>
            </div>
        </>
    );
}
