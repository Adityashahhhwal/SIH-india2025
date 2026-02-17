"use client";

import { ChecklistCard } from "@/components/checklists/ChecklistCard";
import { Backpack, FileText, Home, ShieldCheck } from "lucide-react";

const survivalKitItems = [
    { id: "sk-1", label: "Water (1 gallon per person/day)", subtext: "3-day supply for evacuation" },
    { id: "sk-2", label: "Non-perishable food", subtext: "Canned goods, protein bars" },
    { id: "sk-3", label: "Flashlight & Batteries", subtext: "Check batteries monthly" },
    { id: "sk-4", label: "First Aid Kit", subtext: "Bandages, antiseptics, medications" },
    { id: "sk-5", label: "Whistle", subtext: "To signal for help" },
    { id: "sk-6", label: "Dust Mask", subtext: "To help filter contaminated air" },
];

const documentsItems = [
    { id: "doc-1", label: "Personal ID / Passport", subtext: "Keep in waterproof bag" },
    { id: "doc-2", label: "Insurance Policies", subtext: "Home, health, and car insurance" },
    { id: "doc-3", label: "Medical Records", subtext: "Prescriptions, allergies list" },
    { id: "doc-4", label: "Property Deeds / Lease", subtext: "Proof of address" },
];

const homePrepItems = [
    { id: "home-1", label: "Secure heavy furniture", subtext: "Anchors for bookshelves/TVs" },
    { id: "home-2", label: "Know gas/water shutoff valves", subtext: "Have wrench nearby" },
    { id: "home-3", label: "Clear gutters & drains", subtext: "Prevent water damage" },
];

export default function PreparePage() {
    return (
        <div className="flex flex-col gap-6 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Preparedness</h1>
                <p className="text-muted-foreground">Essential checklists and guides for disaster readiness.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <ChecklistCard
                    title="Survival Kit"
                    description="Essentials for 72-hour survival."
                    icon={Backpack}
                    items={survivalKitItems}
                />
                <ChecklistCard
                    title="Critical Documents"
                    description="Copies of important identification."
                    icon={FileText}
                    items={documentsItems}
                />
                <ChecklistCard
                    title="Home Safety"
                    description="Securing your physical environment."
                    icon={Home}
                    items={homePrepItems}
                />
            </div>

            {/* Info Section could go here */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Did you know?</h3>
                    <p className="text-muted-foreground mt-1">
                        Setting up a "Family Meeting Point" is crucial. In a disaster, communication networks often fail. Agree on a physical location (like a park or a specific landmark) where your family will reunite if separated.
                    </p>
                </div>
            </div>
        </div>
    );
}
