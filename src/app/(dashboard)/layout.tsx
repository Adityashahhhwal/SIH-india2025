import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
