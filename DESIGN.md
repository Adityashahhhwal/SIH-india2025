# Design System: SIH-India2025 Command Center

## 1. Visual Theme & Atmosphere
**"Futuristic Command Center"** meets **"High-Stakes Utility"**

The design communicates urgency, precision, and authority. It feels like a modern SaaS dashboard used by emergency responders in a sci-fi near-future.
- **Mood:** Sophisticated, dark, data-dense, trustworthy.
- **Lighting:** Dark mode default. "Holographic" glowing accents on critical elements (alerts, live status).
- **Depth:** Deep background layers with glassmorphism (frosted glass) overlays to separate content without blocking context.
- **Density:** High data density. Utilizes "Bento Grid" layouts to organize complex information efficiently.

## 2. Color Palette & Roles

### Backgrounds & Surfaces
- **Void Black (#0f1419):** Main application background. Deep and receding.
- **Radar Slate (#1a2332):** Secondary background for sidebars and panels.
- **Glass Panel (rgba(30, 41, 59, 0.7)):** For cards and overlays. Used with `backdrop-filter: blur(12px)`.

### Functional Colors
- **Safety Orange (#ff6b35):** primary-action. Used for main CTAs ("Get Help", "SOS"), critical warnings, and focused states. High visibility.
- **Electric Teal (#00d4aa):** success. Used for "Safe" statuses, "active" indicators, and positive data trends.
- **Signal Blue (#3b82f6):** info/accent. Used for map markers, navigation links, and neutral information.
- **Alert Red (#ef4444):** destructive/critical. Used for "Danger" zones, error states, and immediate evacuation orders. Warning glows.
- **Caution Amber (#f59e0b):** warning. Used for "Watch" advisories and moderate risks.

### Text Colors
- **Hologram White (#f1f5f9):** text-primary. High contrast headers and key data values.
- **Tactical Gray (#94a3b8):** text-secondary. UI labels, body text, and descriptions.
- **Muted Steer (#64748b):** text-muted. Timestamps, footnotes, and inactive icons.

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
