"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShieldAlert } from "lucide-react";
import { useState } from "react";

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
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                    <Link href="/">SIH-India<span className="text-primary">2025</span></Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname.startsWith(item.href)
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <Button variant="destructive" size="sm" className="font-bold animate-pulse shadow-glow-critical">
                            SOS EMERGENCY
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-6">
                                <div className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-lg font-semibold py-2 px-4 rounded-md transition-colors hover:bg-muted",
                                                pathname.startsWith(item.href)
                                                    ? "bg-accent text-accent-foreground"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <Button variant="destructive" className="w-full font-bold h-12 text-lg shadow-glow-critical">
                                        SOS EMERGENCY
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
