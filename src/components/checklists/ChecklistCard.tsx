import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChecklistItem } from "./ChecklistItem";
import { LucideIcon } from "lucide-react";

interface ChecklistCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    items: { id: string; label: string; subtext?: string }[];
}

export function ChecklistCard({ title, description, icon: Icon, items }: ChecklistCardProps) {
    // Mock progress calculation for UI demo
    const progress = 0;

    return (
        <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">0/{items.length}</span>
                </div>
                <CardDescription>{description}</CardDescription>
                <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="grid gap-3">
                {items.map((item) => (
                    <ChecklistItem key={item.id} {...item} />
                ))}
            </CardContent>
        </Card>
    );
}
