import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4002";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const res = await fetch(`${BACKEND_URL}/bot/v1/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: "Backend error", details: errorText },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Chat proxy error:", error);
        return NextResponse.json(
            { error: "Failed to reach backend", message: String(error) },
            { status: 502 }
        );
    }
}
