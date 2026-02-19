import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Heart,
    Building2,
    FileText,
    Phone,
    ExternalLink,
    HandHeart,
    BrainCircuit,
    Hammer,
    ShieldCheck,
} from "lucide-react";

const insuranceResources = [
    {
        title: "PMFBY Claim Portal",
        description: "Pradhan Mantri Fasal Bima Yojana — Crop insurance claims for flood/drought.",
        link: "https://pmfby.gov.in",
        phone: "1800-200-7710",
    },
    {
        title: "NDRF Compensation",
        description: "National Disaster Response Fund — Apply for disaster relief and ex-gratia payments.",
        link: "https://ndma.gov.in",
        phone: "011-26701728",
    },
    {
        title: "State SDRF Claims",
        description: "State Disaster Response Fund — State-level assistance for housing and property loss.",
        link: "#",
        phone: "Contact your District Collector",
    },
];

const mentalHealthResources = [
    {
        title: "iCall (TISS)",
        description: "Free psychosocial counselling for disaster-affected individuals.",
        phone: "9152987821",
        availability: "Mon–Sat, 8 AM – 10 PM",
    },
    {
        title: "Vandrevala Foundation",
        description: "24/7 mental health helpline — multilingual support.",
        phone: "1860-2662-345",
        availability: "24/7",
    },
    {
        title: "NIMHANS Helpline",
        description: "National Institute of Mental Health — trauma and crisis support.",
        phone: "080-46110007",
        availability: "Mon–Sat, 9 AM – 5 PM",
    },
];

const rebuildingGuides = [
    {
        title: "Structural Assessment",
        description: "Check foundation cracks, wall stability, and roof integrity before re-entering.",
        icon: Building2,
    },
    {
        title: "Document Everything",
        description: "Photograph all damage for insurance claims. Keep receipts for all repairs.",
        icon: FileText,
    },
    {
        title: "Rebuild Safer",
        description: "Use earthquake-resistant designs, elevated foundations in flood zones. Consult local building codes.",
        icon: Hammer,
    },
    {
        title: "Community Support",
        description: "Connect with local NGOs like Red Cross, Goonj, and Habitat for Humanity for rebuilding aid.",
        icon: HandHeart,
    },
];

export default function RecoverPage() {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Recovery & Aid</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Financial assistance, mental health support, and rebuilding guidance.
                </p>
            </div>

            {/* Insurance & Aid Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Insurance & Financial Aid</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {insuranceResources.map((resource) => (
                        <Card key={resource.title} className="border-border/50 bg-card/50 flex flex-col">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">{resource.title}</CardTitle>
                                <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span className="font-mono">{resource.phone}</span>
                                </div>
                                {resource.link !== "#" && (
                                    <Button variant="outline" size="sm" className="w-full" asChild>
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Visit Portal
                                        </a>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Mental Health Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-secondary/10">
                        <BrainCircuit className="h-5 w-5 text-secondary" />
                    </div>
                    <h2 className="text-xl font-semibold">Mental Health Support</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mentalHealthResources.map((resource) => (
                        <Card key={resource.title} className="border-border/50 bg-card/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-destructive" />
                                    {resource.title}
                                </CardTitle>
                                <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="font-mono font-medium">{resource.phone}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{resource.availability}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Info banner */}
                <div className="mt-4 rounded-xl border border-secondary/20 bg-secondary/5 p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 rounded-full bg-secondary/10 text-secondary shrink-0">
                        <Heart className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">It&apos;s Okay to Ask for Help</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Disaster trauma is real. Even weeks after an event, you may experience anxiety, trouble sleeping, or flashbacks. All helplines above are free, confidential, and staffed by trained professionals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Rebuilding Guide Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-[#3b82f6]/10">
                        <Hammer className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <h2 className="text-xl font-semibold">Rebuilding Guide</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {rebuildingGuides.map((guide) => {
                        const Icon = guide.icon;
                        return (
                            <Card key={guide.title} className="border-border/50 bg-card/50">
                                <CardContent className="flex items-start gap-4 pt-6">
                                    <div className="p-2 rounded-lg bg-accent shrink-0">
                                        <Icon className="h-5 w-5 text-accent-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{guide.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
