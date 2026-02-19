import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4002";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");
        const type = searchParams.get("type") || "shelter";

        // If lat/lng provided, use nearby endpoint
        if (lat && lng) {
            const params = new URLSearchParams({ lat, lng, type });
            const radius = searchParams.get("radius");
            if (radius) params.set("radius", radius);

            const res = await fetch(
                `${BACKEND_URL}/api/v1/resources/nearby?${params.toString()}`,
                { next: { revalidate: 60 } }
            );
            if (!res.ok) return NextResponse.json({ resources: [] }, { status: res.status });
            return NextResponse.json(await res.json());
        }

        // Otherwise return shelters
        const res = await fetch(`${BACKEND_URL}/api/v1/resources/shelters`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return NextResponse.json({ resources: [] }, { status: res.status });
        return NextResponse.json(await res.json());
    } catch {
        return NextResponse.json({ resources: [] }, { status: 502 });
    }
}
