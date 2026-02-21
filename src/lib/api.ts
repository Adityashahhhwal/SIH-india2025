// Typed API client for all backend endpoints
// Uses relative paths to hit Next.js API proxy routes

export interface Alert {
    _id: string;
    type: string;
    message: string;
    source: string;
    disasterId?: string;
    timestamp: string;
    expiresAt: string;
}

export interface Stats {
    activeHazards: number;
    sheltersOpen: number;
    peopleAssisted: number;
    systemStatus: string;
}

export interface Shelter {
    _id: string;
    name: string;
    type: string;
    location: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    status: string;
    capacity: {
        total: number;
        current: number;
    };
    contact?: {
        phone?: string;
        email?: string;
    };
    tags: string[];
}

export interface Disaster {
    _id: string;
    type: string;
    severity: string;
    title: string;
    description: string;
    location: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    affectedRadius: number;
    status: string;
    timestamp: string;
}

export interface ChatResponse {
    reply?: string;
    message?: string;
    error?: string;
    botMessage?: string;
    userMessage?: string;
    fallback?: boolean;
}

// --- Fetch Functions ---
// All functions catch errors and return safe defaults so the UI
// works offline without spamming the console with 502 retries.

export async function fetchAlerts(
    limit = 50,
    type?: string
): Promise<Alert[]> {
    try {
        const params = new URLSearchParams({ limit: String(limit) });
        if (type) params.set("type", type);

        const res = await fetch(`/api/alerts?${params.toString()}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.alerts ?? [];
    } catch {
        return [];
    }
}

export async function fetchStats(): Promise<Stats | null> {
    try {
        const res = await fetch("/api/stats");
        if (!res.ok) return null;
        const data = await res.json();
        return data.stats ?? null;
    } catch {
        return null;
    }
}

export async function fetchShelters(): Promise<Shelter[]> {
    try {
        const res = await fetch("/api/resources");
        if (!res.ok) return [];
        const data = await res.json();
        return data.resources ?? [];
    } catch {
        return [];
    }
}

export async function fetchDisasters(): Promise<Disaster[]> {
    try {
        const res = await fetch("/api/disasters");
        if (!res.ok) return [];
        const data = await res.json();
        return data.disasters ?? [];
    } catch {
        return [];
    }
}

export async function sendChatMessage(
    text: string
): Promise<ChatResponse> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) {
        return { error: "Backend unavailable", message: "Could not reach the server." };
    }
    return res.json();
}
