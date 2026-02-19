# Design System: SIH-India2025 Command Center

## 1. Visual Theme & Atmosphere
**"Oceanic Clarity"** meets **"Emergency Response"**

The design communicates calmness, clarity, and precision. It uses a clean light mode by default with deep teal accents to convey trust and stability during crises.
- **Mood:** Clean, professional, humanitarian, trustworthy.
- **Lighting:** Light mode default. High contrast text (#09637e) on soft white backgrounds (#ebf4f6).
- **Depth:** Subtle shadows and clean borders. "Glass" effects are used sparingly for overlays.
- **Density:** High data density but with breathing room (airy layouts).

## 2. Color Palette & Roles

### Backgrounds & Surfaces
- **Coastal White (#ebf4f6):** Main application background. Soft, easier on the eyes than pure white.
- **Pure White (#ffffff):** Card backgrounds, panels, and popovers.
- **Surface Overlay (rgba(255, 255, 255, 0.9)):** Glass panels.

### Functional Colors
- **Deep Ocean (#09637e):** primary/foreground. Used for main text, primary buttons (solid), and headers.
- **Lagoon Teal (#088395):** accent/ring. Used for active states, focus rings, and highlighted icons.
- **Reef Green (#7ab2b2):** secondary/muted. Used for secondary buttons, borders, and muted text.
- **Alert Red (#ef4444):** destructive. Used for "Danger" zones and errors. (Standard semantic red).
- **Amber Warning (#f59e0b):** warning. (Standard semantic amber).

### Text Colors
- **Slate Black (#0f172a):** text-foreground. Headings and body text. High contrast for readability.
- **Teal Muted (#088395):** text-muted. Labels and secondary info.

## 3. Typography Rules

### Primary Font: **Inter** (System Sans)
Used for all UI elements, headings, and readability.
- **Headings:** Bold (700) or Extra Bold (800). Tight letter-spacing (-0.02em) for a solid, authoritative look.
- **Body:** Regular (400) or Medium (500). Standard tracking for legibility.

### Data Font: **JetBrains Mono** or **Geist Mono**
Used exclusively for numbers, coordinates, timestamps, and live metrics.
- **Style:** Uppercase often used for labels (e.g., "LAT: 28.6139° N").
- **Weight:** Medium (500).

## 4. Component Stylings

### Buttons
- **Primary Action:** Pill-shaped (`rounded-full`). Solid Safety Orange background. Subtle inner shadow for depth. Hover: Brightens and lifts.
- **Secondary/Ghost:** Semi-transparent background (`bg-white/10`). 1px solid border (`border-white/20`). Text turns white on hover.
- **SOS Button:** Large, circular, pulsing red glow. Impossible to miss.

### Cards & Containers
- **Glass Cards:** standard-card. `rounded-xl` (16px). Background `bg-slate-900/60` with `backdrop-blur-md`.
- **Borders:** Thin, subtle borders (`1px solid rgba(148, 163, 184, 0.1)`).
- **Shadows:** Soft, diffused shadows for depth (`shadow-lg`). Critical cards have a colored glow (e.g., Red glow for Alert cards).

### Inputs & Forms
- **Fields:** Rectangular with slightly rounded corners (`rounded-lg`).
- **Background:** Deep recess (`bg-slate-950/50`).
- **Focus:** No default browser outline. Glows with Signal Blue or Safety Orange border when active.

### Data Visualization
- **Charts:** Minimalist lines. Gradient fills (fade to transparent).
- **Gauges:** Thin circular tracks with glowing tips.
- **Maps:** Dark mode map tiles (e.g., Mapbox Dark). Custom markers using iconography from the design system.

## 5. Layout Principles
- **Grid First:** All dashboards use a responsive 12-column grid.
- **Bento Grids:** Content is organized into modular, rectangular blocks (bento box style) that fill the available space.
- **Whitespace:** Tighter than consumer apps to allow for higher data density, but grouped logically to prevent clutter. 
- **Spacing:** Base unit of 4px. Common gaps: 16px (gap-4), 24px (gap-6).
