import { openDB, DBSchema } from "idb";

interface DisasterDB extends DBSchema {
    disasters: {
        key: string;
        value: {
            id: string;
            type: string;
            title: string;
            timestamp: number;
        };
    };
    reports: {
        key: string;
        value: {
            id: string;
            content: string;
            location: { lat: number; lng: number };
            synced: boolean;
        };
    };
}

export const dbPromise = openDB<DisasterDB>("sih-disaster-db", 1, {
    upgrade(db) {
        db.createObjectStore("disasters", { keyPath: "id" });
        db.createObjectStore("reports", { keyPath: "id" });
    },
});

export async function saveReportOffline(report: any) {
    const db = await dbPromise;
    await db.put("reports", { ...report, synced: false, id: crypto.randomUUID() });
}

export async function getPendingReports() {
    const db = await dbPromise;
    return db.getAll("reports");
}
