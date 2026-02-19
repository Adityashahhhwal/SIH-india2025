"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    fetchAlerts,
    fetchStats,
    fetchShelters,
    fetchDisasters,
    sendChatMessage,
} from "@/lib/api";
import type { Alert, Stats, Shelter, Disaster, ChatResponse } from "@/lib/api";

// Re-export types for convenience
export type { Alert, Stats, Shelter, Disaster, ChatResponse };

/** Fetches active alerts, auto-refetches every 30s */
export function useAlerts(limit = 50, type?: string) {
    return useQuery<Alert[]>({
        queryKey: ["alerts", limit, type],
        queryFn: () => fetchAlerts(limit, type),
        refetchInterval: 30_000,
    });
}

/** Fetches dashboard stats summary, auto-refetches every 30s */
export function useStats() {
    return useQuery<Stats | null>({
        queryKey: ["stats"],
        queryFn: fetchStats,
        refetchInterval: 30_000,
    });
}

/** Fetches shelter resources */
export function useShelters() {
    return useQuery<Shelter[]>({
        queryKey: ["shelters"],
        queryFn: fetchShelters,
        refetchInterval: 60_000,
    });
}

/** Fetches active disasters for map markers */
export function useDisasters() {
    return useQuery<Disaster[]>({
        queryKey: ["disasters"],
        queryFn: fetchDisasters,
        refetchInterval: 30_000,
    });
}

/** Mutation hook for sending chat messages */
export function useChatMutation() {
    return useMutation<ChatResponse, Error, string>({
        mutationFn: (text: string) => sendChatMessage(text),
    });
}
