# Stitch Prompts for SIH-India2025

Use these prompts with Stitch to generate the core UI components. They are calibrated to the Command Center design system defined in `DESIGN.md`.

## 1. Hero / Landing Page
**Prompt:**
> Create a high-stakes, futuristic landing page for a specialized Disaster Management AI. 
> **Visual Style:** Dark mode, command center aesthetic. Background should be deep void black (#0f1419) with a subtle, pulsing radar-sweep effect overlay.
> **Typography:** Large, authoritative Inter Bold headings in white (#f1f5f9). 
> **Layout:**
> 1. **Navbar:** Glassmorphism top bar with logo "DisasterAI" (shield icon), navigation links (Prepare, Monitor, Respond), and a pulsing red "SOS" button on the right.
> 2. **Hero Section:** Center alignment. Headline: "AI-Powered Disaster Response Navigator". Sub-headline in slate gray. Two primary call-to-action buttons: "View Predictions" (Safety Orange pill shape) and "Live Map" (Ghost button with blue borders).
> 3. **Visual:** A central "holographic" globe or map visualization made of glowing dots (cyan/teal) to the right or center.
> **Components:** Use bento-grid style cards for "Active Alerts" below the hero, with glassmorphism backgrounds and glowing borders for critical alerts.

## 2. Mission Control Dashboard (Monitor Page)
**Prompt:**
> Design a dense, data-rich "Mission Control" dashboard for monitoring natural disasters.
> **Visual Layout:** 12-column grid. Everything contained in "Bento Box" glass panels (`bg-slate-900/60`, `backdrop-blur`).
> **Key Sections:**
> 1. **Sidebar:** Thin vertical icon rail on the left (Home, Map, Alerts, Settings). Active state glows Electric Teal.
> 2. **Main Feed (Center-Left):** "Live Alerts" feed. Each item is a compact card. Critical alerts have a red left-border and faint red background glow. Icons should be specific (hurricane, fire, flood).
> 3. **Map Widget (Right, Large):** A large rectangular map preview showing dark mode map with animated "pulse" rings at disaster coordinates.
> 4. **Stats Row (Top):** 4 small cards showing: "Active Hazards" (12), "Shelters Open" (85%), "People Assisted" (1,240), "System Status" (green dot "Online").
> **Typography:** Use JetBrains Mono for all numbers and timestamps.

## 3. Interactive Map Overlay (Respond Page)
**Prompt:**
> Create a sophisticated map interface UI overlay.
> **Context:** The background is a full-screen dark map. The UI floats on top.
> **Elements:**
> 1. **Search Bar (Top Left):** Floating glass bar with "Search location or coordinates...".
> 2. **Filter Chips (Top Center):** Pill-shaped toggles for "Shelters", "Hazards", "Hospitals", "Police". Active chips are filled Signal Blue.
> 3. **Detail Panel (Right):** A slide-out glass drawer showing details for a selected hazard. Includes: Title "flood Warning", Severity Level (Critical - Red), "Time to Impact" countdown (JetBrains Mono), and "Evacuation Route" button (Safety Orange).
> 4. **Bottom Bar:** Scrubber/timeline to see predictions over the next 24 hours.

## 4. Mobile Emergency View
**Prompt:**
> Design a mobile-first "Emergency Mode" screen focused on speed and high stress.
> **Style:** High contrast, large touch targets.
> **Key Elements:**
> 1. **SOS Button:** Massive, circular button in the bottom half. Pulsing red shadow.
> 2. **Quick Actions:** Grid of 4 large square buttons: "Share Location", "Medical Info", "Flashlight" (toggle), "Siren" (toggle).
> 3. **Status Banner:** Top fixed banner showing current threat level (e.g., "EXTREME DANGER - SEEK SHELTER") in bright red background with white text.
