---
name: Clinical Precision Logistics
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#73777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#466080'
  primary: '#00182f'
  on-primary: '#ffffff'
  primary-container: '#0f2d4a'
  on-primary-container: '#7a95b7'
  inverse-primary: '#aec9ed'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#001c10'
  on-tertiary: '#ffffff'
  tertiary-container: '#003321'
  on-tertiary-container: '#29a678'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#aec9ed'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#2e4867'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  label-ui:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a clinical, high-integrity user environment tailored for biosafety laboratory managers, clinical technicians, and hospital procurement officers handling high-consequence diagnostic consumables (HIV viral load assays, p24 antigen rapid tests, lysis buffers, and micro-pipette tips).

The visual language bridges strict clinical sterility with high ergonomic efficiency. It avoids the intimidating clutter of legacy Laboratory Information Management Systems (LIMS) without falling into generic consumer minimalism. 

- **Aesthetic Movement:** Modern Clinical Precision—characterized by surgical density, low visual noise, crisp micro-borders, and high-readability data tables.
- **Audience Context:** Fast-paced laboratory environments under fluorescent lighting, dual-monitor workstations, and barcode-scanner mobile terminals operated with gloved hands.
- **Emotional Response:** Absolute diagnostic certainty, zero cognitive fatigue during repetitive data-entry shifts, and instant, unambiguous visual triage of lot statuses.

## Colors

The palette establishes an immediate clinical hierarchy. The dominant base relies on high-albedo, glare-resistant slate surfaces paired with deep nautical navy to anchor data structure. 

### Role Mapping
- **Primary (`#0f2d4a` - Deep Navy):** Represents regulatory authority and structural foundation. Used for navigation bars, dominant table headers, primary action buttons, and active data states.
- **Secondary (`#0284c7` - Diagnostic Cyan):** Applied to active navigational selections, focused interactive inputs, cold-chain temperature telemetry, and interactive links.
- **Tertiary (`#059669` - Safe Clinical Green):** Signals validated quality control, adequate stock tiers, sealed cold-chain integrity, and lots cleared for patient diagnostics.
- **Neutral (`#64748b` - Slate Grey):** Neutralizes visual clutter. Powers structural dividers, metadata labels, unit measures, and disabled actions.

### Clinical Status Accents
- **Expiring / Low Stock Warning (`#f59e0b` - Amber):** Exclusively indicates lots nearing expiration (30–60 day threshold) or stock hitting buffer reorder points.
- **Critical / Quarantined (`#ef4444` - Crimson):** Strictly isolates expired lots, damaged temperature-chain breaches, and biohazard containment flags.
- **Base Canvas (`#f8fafc` - Clinical Slate Canvas):** A sterile, anti-glare backdrop that preserves optical contrast without causing eye strain over long diagnostic shifts.

## Typography

Typography prioritizes tabular clarity and instant scan-time differentiation between alphanumeric strings.

- **Primary Typeface (`Hanken Grotesk`):** Serves headlines, structural labels, and general reading text. Its geometric precision and open counters prevent letter collision at condensed sizes.
- **Data & Numeric Typeface (`JetBrains Mono`):** Assigned unconditionally to Batch Numbers, Lot IDs, Expiration Timestamps, GTIN-13 Barcode strings, and Thai Baht currency amounts (`฿`). Its distinct character shapes (e.g., slashed zero `0`, distinct `1`, `l`, and `I`) eliminate diagnostic verification errors.
- **Tabular Lining:** All tabular data must force tabular number properties (`font-variant-numeric: tabular-nums`) so decimal columns align vertically for rapid auditing.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid structured around information density. Lab workstations demand compact, scannable data layouts rather than expansive decorative white space.

### Grid & Form Factors
- **Desktop (1024px and up):** 12-column grid, `margin-desktop` (32px), `gutter-desktop` (24px). Sidebar navigation remains anchored to preserve continuous stock tallying and scanning access.
- **Tablet / Mounted Terminals (768px - 1023px):** 8-column grid with collapsed iconographic navigation, prioritizing table widths and interactive verification checklists.
- **Mobile Handheld Scanners (<768px):** 4-column layout, `margin` (16px), `gutter` (16px). Single-column cards replace dense data tables; touch targets scale to a minimum height of 48px to accommodate gloved interaction.

### Vertical Rhythm
Interface groupings enforce a strict 8px baseline rhythm (using `space-xs` through `space-xl`). Data table rows maintain a fixed height tier: 36px for ultra-dense audit logs, 48px for standard operational inventories, and 56px for interactive mobile scan lists.

## Elevation & Depth

Visual hierarchy relies on crisp surface layering and razor-sharp border separation rather than atmospheric, diffuse drop shadows. This maintains a sterile, low-glare appearance on medical display hardware.

- **Tonal Layers:** The primary canvas rests on `#f8fafc`. Surface cards, analytical tables, and modals elevate using pure white `#ffffff`. Inactive or recessed modules drop to `#f1f5f9`.
- **Low-Contrast Micro-Borders:** Panels, table cells, and form inputs utilize 1px solid borders (`#e2e8f0`). Critical components transition directly to the operational status colors (`#ef4444`, `#f59e0b`, `#059669`).
- **Targeted Shadows:**
  - *Resting Cards / Tables:* Zero shadow; boundaries are strictly demarcated via `#e2e8f0` structural borders.
  - *Flyout Drawers / Tooltips (Level 1):* `0 2px 4px -1px rgba(15, 45, 74, 0.06), 0 1px 2px -1px rgba(15, 45, 74, 0.04)`.
  - *Modals & Emergency Quarantine Dialogs (Level 2):* `0 10px 15px -3px rgba(15, 45, 74, 0.1), 0 4px 6px -2px rgba(15, 45, 74, 0.05)`, backed by a solid 40% tinted navy veil (`rgba(15, 45, 74, 0.4)`).

## Shapes

The design system employs a restrained **Soft (`1`)** shape profile. Subtle rounding (4px default) removes abrasive square corners without introducing the playful or toy-like qualities of high-radius curves.

- **Base Radius (4px / 0.25rem):** Form inputs, buttons, status chips, table action cells, and notification alerts.
- **Container Radius (8px / 0.5rem - `rounded-lg`):** Inventory cards, metric tiles, multi-lot reconciliation tables, and modal dialogues.
- **Nested Radii Rule:** Child elements within an 8px parent container must use 4px corner radii to preserve visual harmony and geometric alignment.

## Components

### Buttons
- **Primary:** Background `#0f2d4a`, text `#ffffff`, border none, 4px radius. Hover state transitions to `#1e3a5f`. Used for mission-critical actions: "Confirm Intake", "Issue Reagent", "Print Barcodes".
- **Secondary:** Surface `#ffffff`, border 1px solid `#cbd5e1`, text `#0f2d4a`. Active state `#f1f5f9`.
- **Destructive/Quarantine:** Surface `#ef4444`, text `#ffffff`. Requires explicit confirmation dialogs for lot disposal or cold-chain discard.
- **Sizes:** Compact (32px height for in-table micro actions), Default (40px for form actions), Touch-Safe (48px on handheld scanner modes).

### Status Chips & Badges
Chips convey lot viability at a glance using tinted backgrounds with saturated text and 1px borders:
- **Valid / In Stock:** Surface `#ecfdf5`, text `#065f46`, border `#a7f3d0`.
- **Expiring Soon (<30 Days):** Surface `#fffbeb`, text `#92400e`, border `#fde68a`.
- **Expired / Recalled:** Surface `#fef2f2`, text `#991b1b`, border `#fecaca`.
- **Monospace Typography:** All quantity units and batch numbers within chips must render via `label-code-sm`.

### Data Tables (The Core Workhorse)
- **Header:** Sticky `#f8fafc`, 1px solid bottom border `#cbd5e1`, uppercase labels in `Hanken Grotesk` 11px font weight 700 with letter spacing `0.05em`.
- **Rows:** Alternating zebra row striping (`#ffffff` and `#fcfdfd`). Row height: 44px. Hover highlight: `#f0f9ff` (pale diagnostic tint).
- **Numeric Alignment:** Quantities, currency (`THB ฿`), and expiration dates align strictly right. Batch/Lot codes align left with monospace font rendering.

### Input Fields & Scanner Integrations
- **Text / Barcode Input:** White background, 1px border `#cbd5e1`, 4px radius, 40px height. Focus ring: 2px offset ring in `#0284c7`.
- **Barcode Scan State:** Displays an active pulsating cyan line indicator within the input when in continuous-read mode.
- **Validation Messages:** Positioned directly below the field with explicit iconography (e.g., cross icon for invalid reagent checksums).

### Checkboxes & Selection Controls
- **Square-check design (4px radius):** Unselected state `#ffffff` with `#94a3b8` border. Selected state `#0f2d4a` with sharp white tick icon. Multi-select table rows trigger an active row tint of `#f0f9ff`.

### Reagent Cold-Chain Telemetry Card
- Specialized component rendering continuous storage temperature (`2°C - 8°C`). Displays current real-time sensor value in `JetBrains Mono` 20px, bordered with status-coded boundaries to immediately flag temperature threshold violations.