import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";
import { OfflineIndicator } from "@/components/layout/OfflineIndicator";
import { Navbar } from "@/components/layout/Navbar";
import { MobileEmergencyBar } from "@/components/layout/MobileEmergencyBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIH-India 2025: Disaster Management",
  description: "AI-Powered Disaster Response & Preparedness System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <MobileEmergencyBar />
          </div>
          <OfflineIndicator />
        </Providers>
      </body>
    </html>
  );
}
