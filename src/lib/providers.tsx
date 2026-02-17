"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        refetchOnWindowFocus: false, // User comes back, data might be stale but don't spam
                        retry: 1, // Fail fast, but try once
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
