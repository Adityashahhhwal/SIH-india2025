import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      {/* Additional landing page sections (Features, Testimonials) will go here */}
    </main>
  );
}
