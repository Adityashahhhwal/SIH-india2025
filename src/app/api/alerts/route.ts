import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4002";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit") || "50";
        const type = searchParams.get("type") || "";

        const params = new URLSearchParams({ limit });
        if (type) params.set("type", type);

        const res = await fetch(
            `${BACKEND_URL}/api/v1/alerts/active?${params.toString()}`,
            { next: { revalidate: 30 } }
        );

        if (!res.ok) {
            return NextResponse.json({ alerts: [] }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ alerts: [] }, { status: 502 });
    }
}
