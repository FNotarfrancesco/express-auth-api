---
name: Mis Productos
description: Sistema de gestión de inventario y catálogo de productos con control de acceso por roles.
colors:
  primary: "#0D1B2A"
  primary-elevated: "#15263B"
  primary-border: "#253A54"
  neutral-ground: "#F4F1EA"
  neutral-surface: "#FCFBF8"
  neutral-alt: "#ECE7DC"
  neutral-recessed: "#E5DFD2"
  ink-primary: "#0D1B2A"
  ink-secondary: "#334155"
  ink-tertiary: "#526071"
  rule-hairline: "#D5CFC2"
  rule-strong: "#B8B0A0"
  brass-accent: "#B45309"
  brass-bright: "#D97706"
  brass-surface: "#FEF3C7"
  emerald-cleared: "#0F766E"
  emerald-surface: "#CCFBF1"
  coral-alert: "#B91C1C"
  coral-surface: "#FEE2E2"
typography:
  headline:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#F8F6F0"
    rounded: "{rounded.sm}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-elevated}"
  badge-admin:
    backgroundColor: "{colors.brass-surface}"
    textColor: "#78350F"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  badge-editor:
    backgroundColor: "{colors.emerald-surface}"
    textColor: "#115E59"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  badge-viewer:
    backgroundColor: "{colors.neutral-alt}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
---

# Design System: Mis Productos (Harbor Clearance & Manifest Ledger)

## Overview

**Creative North Star: "The Port Authority Cargo Manifest"**

An authoritative operational ledger designed for high-density catalog inspection, multi-role clearance, and inventory telemetry. The system pairs an architectural Deep Harbor Navy command shell with warm stone working grounds and alabaster card surfaces, rejecting both generic dark glassmorphism and bland monochromatic corporate tables.

Visual hierarchy is structural and rigorous: 1px hairline seams divide panels rather than floating drop-shadows, role authorizations are color-coded in warm brass and maritime emerald, and data values (prices, units, IDs, timestamps) are strictly rendered in tabular monospace figures for instant horizontal scanning.

**Key Characteristics:**
- Deep Harbor Navy (`#0D1B2A`) command header with real-time inventory telemetry strip.
- Warm Stone (`#F4F1EA`) body ground with crisp Alabaster (`#FCFBF8`) cards.
- 1px hairline seam grids (`#D5CFC2`) instead of nested cards or floating blobs.
- Proportional stock-level meters directly indicating depletion urgency.
- Role-gated clarity across all three tiers: `admin`, `editor`, and `viewer`.

## Colors

A restrained operational palette grounded in maritime authority and mineral stone, with semantic signals reserved strictly for state and role clearance.

### Primary
- **Deep Harbor Navy** (`#0D1B2A`): Structural command shell, top header bar, primary buttons, and active filter states.
- **Deep Harbor Elevated** (`#15263B`): Telemetry cells, hover states on dark headers, and demo role dispatch cards.

### Neutral
- **Manifest Ground** (`#F4F1EA`): Physical page ground for the entire application.
- **Manifest Surface (Alabaster)** (`#FCFBF8`): Card background, modal background, and form surface.
- **Manifest Surface Alt** (`#ECE7DC`): Section header bars, segmented filter wells, and inactive cell grounds.
- **Ink Primary** (`#0D1B2A`): Headings, product names, prices, and high-emphasis body text.
- **Ink Secondary** (`#334155`): Labels, descriptions, and metadata.
- **Rule Hairline** (`#D5CFC2`): 1px structural dividing lines across grids and cards.
- **Rule Strong** (`#B8B0A0`): Form control borders and interactive outlines.

### Semantic Clearance & Accents
- **Signal Brass / Amber** (`#D97706` / Surface `#FEF3C7`): Admin role badges and active session indicators.
- **Maritime Emerald** (`#0F766E` / Surface `#CCFBF1`): Available stock status, active toggle switches, and positive inventory meters.
- **Signal Coral** (`#B91C1C` / Surface `#FEE2E2`): Out of stock warnings, destructive delete actions, and error banners.

### Named Rules
**The Clearance Signal Rule.** Saturated brass, emerald, and coral colors are exclusively reserved for role credentials and operational inventory status (cleared, depleted, pending). They are never applied as decorative background gradients or text fills.

## Typography

**Display / Headline Font:** `Public Sans` (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
**Body Font:** `Public Sans`
**Data / Label Font:** `JetBrains Mono` (ui-monospace, monospace)

**Character:** Balanced modern grotesk with maritime clarity, paired with engineer-grade tabular numerals for prices and stock counts.

### Hierarchy
- **Headline** (Bold 700, 1.5rem, line-height 1.2, tracking -0.025em): Primary view titles ("Listado de Productos", "Iniciar Sesión").
- **Title** (Bold 700, 1.0625rem, line-height 1.35, tracking -0.015em): Product names and section headers.
- **Price** (Bold 700, 1.25rem, tabular monospace): Prominent catalog pricing.
- **Body** (Regular 400, 0.9375rem, line-height 1.5): Product specifications and form helper copy (max 65–75ch).
- **Label / Tag** (SemiBold 600, 0.75rem, JetBrains Mono): Sequential item IDs (`#001`), role badges, and table column descriptors.

## Layout

- **Shell:** Sticky/top command header (`1320px` max width) housing brand identity, live clearance telemetry metrics, and operator profile.
- **Work Area:** Single-column structured ledger on desktop, auto-stacking into flexible 12-column form grids and responsive manifest cards (`minmax(320px, 1fr)`).
- **Hairline Grid Architecture:** Product and user cards are tiled on a continuous `1px` grid seam (`background-color: var(--rule-hairline); gap: 1px`), creating clean spatial order without shadow clutter.

## Elevation & Depth

**Tonal Layering over Floating Shadows.** Depth is expressed primarily through surface tint steps (`#0D1B2A` → `#F4F1EA` → `#FCFBF8`) and precision `1px` borders. Floating drop shadows are prohibited on cards at rest; subtle directional shadows (`0 16px 36px rgba(13, 27, 42, 0.28)`) are reserved solely for high-priority blocking modal dialogs.

## Shapes

- **Base Radius:** `6px` for buttons, badges, inputs, and controls.
- **Panel Radius:** `10px` to `12px` for outer cards and modal containers.
- **Pill Radius:** `9999px` strictly for segmented filter pills, status dots, and metric badges.

## Components

### Buttons
- **Primary Dispatch:** Deep Harbor Navy fill with white text, `6px` radius, hover elevation to `#15263B`.
- **Edit Action:** Alabaster fill with hairline border `#B8B0A0`, hover shift to Navy `#0D1B2A`.
- **Destructive Delete:** Outline-only at rest; shifts to Signal Coral fill (`#FEE2E2` / text `#B91C1C`) only when focused or hovered. Separated by empty margin to prevent misclicks.

### Manifest Cards
- **Clearance Strip:** Top row displays sequential mono index (`#001`), category chip, and availability stamp.
- **Stock Meter:** Depicts stock health via a proportional fill bar (`#0F766E` when available, `#B8B0A0` when depleted).
- **Out of stock recession:** Unavailable products take a muted ground (`#ECE7DC`) and softened typography to elevate available inventory.

### Segmented Capsule Filter
- **Tri-state Filter:** High-contrast pill capsule with three options (*Todos*, *Disponibles*, *No disponibles*), featuring numerical counts in each button and smooth transition.

## Do's and Don'ts

### Do:
- **Do** format all prices, stock quantities, and product IDs in tabular monospace (`JetBrains Mono`).
- **Do** maintain 1px hairline seams between tiled card elements.
- **Do** isolate destructive actions (Eliminar) physically away from navigation and edit actions.
- **Do** visually dim out-of-stock items so available stock stands out immediately.

### Don't:
- **Don't** reintroduce blur, glassmorphism, or diffuse zero-offset colored glow effects.
- **Don't** nest cards inside cards. Use ruled sections and tonal background shifts instead.
- **Don't** use generic emoji or unicode symbols as primary operational icons.
- **Don't** hide active role clearance; the user's role must be legible at all times.
