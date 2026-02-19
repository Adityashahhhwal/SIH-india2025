import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased text-foreground",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
            >
              Skip to main content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main id="main-content" className="flex-1" role="main">
                {children}
              </main>
              <MobileEmergencyBar />
            </div>
            <OfflineIndicator />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
