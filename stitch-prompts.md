# Stitch Prompts for SIH-India2025

Use these prompts with Stitch to generate the core UI components. They are calibrated to the Command Center design system defined in `DESIGN.md`.

## 1. Hero / Landing Page
**Prompt:**
> Create a high-stakes, professional landing page for a Disaster Management AI.
> **Visual Style:** Light mode, "Oceanic Clarity" aesthetic. Background should be soft coastal white (#ebf4f6) with subtle teal accents.
> **Typography:** Large, authoritative Inter Bold headings in Slate Black (#0f172a).
> **Layout:**
> 1. **Navbar:** Glassmorphism white top bar with logo "DisasterAI", navigation links, and a pulsing red "SOS" button.
> 2. **Hero Section:** Center alignment. Headline: "AI-Powered Disaster Response Navigator". Sub-headline in teal-muted. Two primary call-to-action buttons: "View Predictions" (Solid Deep Ocean Blue) and "Live Map" (Outline Teal).
> 3. **Visual:** A central clean map visualization or illustration in teal/blue tones.
> **Components:** Use bento-grid style cards for "Active Alerts" below the hero, with white backgrounds, teal borders, and clear typography.

## 2. Mission Control Dashboard (Monitor Page)
**Prompt:**
> Design a dense, data-rich "Mission Control" dashboard for monitoring natural disasters.
> **Visual Layout:** 12-column grid. Everything contained in "Bento Box" panels with clean white backgrounds and soft teal borders (`border-teal-200`).
> **Key Sections:**
> 1. **Sidebar:** Thin vertical icon rail on the left (Home, Map, Alerts, Settings). Active state uses Deep Ocean Blue background.
> 2. **Main Feed (Center-Left):** "Live Alerts" feed. Cards are white with shadow. Critical alerts have a red left-border. Icons are clear and colored.
> 3. **Map Widget (Right, Large):** A large rectangular map preview showing a detailed light-mode relief map with pulsing teal rings at disaster coordinates.
> 4. **Stats Row (Top):** 4 small cards showing: "Active Hazards" (12), "Shelters Open" (85%), "People Assisted" (1,240), "System Status" (green dot "Online").
> **Typography:** Use JetBrains Mono for all numbers and timestamps. Text is Slate Black (#0f172a).

## 3. Interactive Map Overlay (Respond Page)
**Prompt:**
> Create a sophisticated map interface UI overlay.
> **Context:** The background is a full-screen light-mode topographic map. The UI floats on top.
> **Elements:**
> 1. **Search Bar (Top Left):** Floating white bar with shadow.
> 2. **Filter Chips (Top Center):** Pill-shaped toggles. Active chips are filled Deep Ocean Blue.
> 3. **Detail Panel (Right):** A slide-out white sheet showing details. Includes: Title "Flood Warning", Severity Level (Critical - Red), "Time to Impact" countdown, and "Evacuation Route" button (Solid Deep Ocean Blue).
> 4. **Bottom Bar:** Scrubber/timeline to see predictions. White background with teal controls.

## 4. Mobile Emergency View
**Prompt:**
> Design a mobile-first "Emergency Mode" screen focused on speed and high stress.
> **Style:** High contrast, large touch targets.
> **Key Elements:**
> 1. **SOS Button:** Massive, circular button in the bottom half. Pulsing red shadow.
> 2. **Quick Actions:** Grid of 4 large square buttons: "Share Location", "Medical Info", "Flashlight" (toggle), "Siren" (toggle).
> 3. **Status Banner:** Top fixed banner showing current threat level (e.g., "EXTREME DANGER - SEEK SHELTER") in bright red background with white text.
