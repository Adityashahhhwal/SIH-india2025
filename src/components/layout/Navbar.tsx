"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navItems = [
    { name: "Prepare", href: "/prepare" },
    { name: "Monitor", href: "/monitor" },
    { name: "Respond", href: "/respond" },
    { name: "Recover", href: "/recover" },
    { name: "Tools", href: "/tools" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-white/10 dark:border-black/10 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[3.25rem] items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center gap-1 cursor-pointer group">
                        <ShieldAlert className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                        <Link href="/" className="font-semibold text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-80">
                            SIH-India<span className="text-primary">2025</span>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav (Apple style evenly spaced) */}
                    <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-[12px] font-medium tracking-wide transition-all duration-300 ease-in-out",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground/80"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center justify-end gap-3 flex-shrink-0">
                        <ModeToggle />
                        <Button variant="destructive" size="sm" className="h-7 text-xs font-semibold px-3 rounded-full shadow-glow-critical animate-pulse-slow tracking-wide">
                            SOS Call
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ModeToggle />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80 hover:text-foreground">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className="w-full bg-background/80 backdrop-blur-2xl border-b border-border/50 pt-16 pb-8 px-6 transition-all duration-300 data-[state=closed]:duration-200"
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetDescription className="sr-only">Main navigation links and emergency actions</SheetDescription>

                                <div className="flex flex-col space-y-4">
                                    {navItems.map((item) => (
                                        <div key={item.href} className="border-b border-border/40 pb-3">
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "text-lg font-medium tracking-tight transition-colors",
                                                    pathname.startsWith(item.href)
                                                        ? "text-foreground"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                    ))}

                                    <div className="pt-4">
                                        <Button variant="destructive" className="w-full font-semibold h-11 text-base rounded-xl shadow-glow-critical">
                                            SOS EMERGENCY
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
