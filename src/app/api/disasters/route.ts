import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4002";

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/disasters/active`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            return NextResponse.json({ disasters: [] }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ disasters: [] }, { status: 502 });
    }
}
