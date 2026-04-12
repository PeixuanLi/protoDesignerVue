# Design System Inspired by Huawei Cloud Console

## 1. Visual Theme & Atmosphere

Huawei Cloud Console is the digital manifestation of enterprise-grade cloud management — a design language built on clarity, efficiency, and professional restraint. The interface operates on a three-tone foundation: a light gray (`#F5F7FA`) page canvas, pure white (`#FFFFFF`) card surfaces, and near-black (`#1A1A1A`) primary text, unified by Huawei's signature blue (`#0066FF`) as the singular accent color. This isn't consumer-facing playfulness; it's purpose-built enterprise tooling where every pixel serves information hierarchy.

The system employs a standard Chinese-optimized sans-serif stack — primarily `PingFang SC` with fallbacks to `Microsoft YaHei` and system sans-serif. Typography is compact and information-dense: body text at 12px–13px, headers at 14px, reflecting the console's DNA of fitting maximum actionable information into minimum screen real estate. Unlike consumer design systems that breathe with generous whitespace, Huawei Cloud favors functional density — every section earns its space through utility.

What defines Huawei Cloud's visual identity beyond the blue-white-gray palette is its systematic approach to component consistency. Cards, tables, buttons, and inputs all share a 4px border-radius — creating a subtly softened rectangular language that feels modern without being whimsical. Shadows are extremely restrained (`0 1px 2px rgba(0,0,0,0.05)`), used only to signal elevation on cards and modals rather than as decorative elements. Visual separation is achieved primarily through border lines (`#E8E8E8`) and background-color layering.

**Key Characteristics:**
- PingFang SC / Microsoft YaHei at compact sizes (12px–14px) — information density over typographic expression
- Single accent color: Huawei Blue (`#0066FF`) — primary actions, links, active states, focus indicators
- Three-layer background system: `#F5F7FA` (page) → `#FFFFFF` (cards) → `#FAFAFA` (table headers)
- Consistent 4px border-radius across all components — subtly rounded, never sharp, never pill
- Minimal shadow usage (`0 1px 2px rgba(0,0,0,0.05)`) — borders do the heavy lifting for separation
- Left sidebar + top header layout pattern — fixed navigation chrome with scrollable content
- 1px solid `#E8E8E8` borders as the primary separation mechanism

## 2. Color Palette & Roles

### Primary
- **Huawei Blue** (`#0066FF`): The singular interactive color. Primary buttons, links, focus states, active indicators, selected items. This is the only chromatic hue in the core UI palette.
- **White** (`#FFFFFF`): Card surfaces, sidebar background, header background, input backgrounds, button text on blue.
- **Near Black** (`#1A1A1A`): Primary text, headings, table data. The darkest element in the light theme.

### Neutral Scale (Gray Family)
- **Gray 900** (`#1A1A1A`): Primary text, headings, table row data. `--hw-text-primary`.
- **Gray 600** (`#666666`): Secondary text, descriptions, table header text, helper text. `--hw-text-secondary`.
- **Gray 400** (`#999999`): Tertiary text, placeholders, disabled labels, timestamps.
- **Gray 200** (`#E8E8E8`): Borders, dividers, input borders, card outlines. `--hw-border`.
- **Gray 150** (`#F0F0F0`): Hover state for interactive rows and items. `--hw-hover`.
- **Gray 100** (`#F5F7FA`): Page background, secondary surface. `--hw-background`.
- **Gray 50** (`#FAFAFA`): Table header background, subtle surface fills. `--hw-table-header`.

### Interactive
- **Blue 60** (`#0066FF`): Primary interactive — buttons, links, focus rings. `--hw-primary`.
- **Blue 70** (`#0052CC`): Hover state for primary blue elements. `--hw-primary-hover`.
- **Blue 80** (`#003D99`): Active/pressed state for blue elements. `--hw-primary-active`.
- **Blue 10** (`#E6F0FF`): Blue tint surface, selected item background. `--hw-primary-bg`.
- **Focus Blue** (`#0066FF`): 1px solid border on focused inputs and interactive elements. `--hw-focus`.

### Support & Status
- **Red 50** (`#FF4D4F`): Error, danger, destructive actions, notification badge. `--hw-error`.
- **Red 10** (`#FFF1F0`): Error background tint. `--hw-error-bg`.
- **Green 50** (`#52C41A`): Success, completed status. `--hw-success`.
- **Green 10** (`#F6FFED`): Success background tint, completed badge background. `--hw-success-bg`.
- **Orange 50** (`#FA8C16`): Warning, hot indicators, pending states. `--hw-warning`.
- **Orange 10** (`#FFF7E6`): Warning background tint. `--hw-warning-bg`.

### Dark Theme (Not observed in screenshots — inferred pattern)
- **Background**: `#1A1A1A` or `#141414`. `--hw-background`.
- **Surface**: `#262626`. Card and container surfaces.
- **Text Primary**: `#F5F5F5`. `--hw-text-primary`.
- **Text Secondary**: `#999999`. `--hw-text-secondary`.
- **Border**: `#363636`. `--hw-border`.
- **Interactive**: `#3385FF`. Links shift lighter for contrast on dark backgrounds.

## 3. Typography Rules

### Font Family
- **Primary (Chinese)**: `PingFang SC`, with fallbacks: `Microsoft YaHei, -apple-system, sans-serif`
- **Primary (English)**: `Helvetica Neue, Arial, sans-serif`
- **Monospace**: `Menlo, Monaco, Consolas, monospace`
- **Icon Font**: Custom SVG icon system — inline SVG icons at 16px default size

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Page Title | PingFang SC | 20px (1.25rem) | 500 (Medium) | 1.40 (28px) | 0 | Top-level page heading |
| Section Title | PingFang SC | 16px (1.00rem) | 500 (Medium) | 1.50 (24px) | 0 | Card titles, section headers |
| Heading | PingFang SC | 14px (0.88rem) | 500 (Medium) | 1.43 (20px) | 0 | Sub-section titles, column headers |
| Body Long | PingFang SC | 14px (0.88rem) | 400 (Regular) | 1.57 (22px) | 0 | Standard reading text, descriptions |
| Body Short | PingFang SC | 13px (0.81rem) | 400 (Regular) | 1.54 (20px) | 0 | Compact body, table cells |
| Caption | PingFang SC | 12px (0.75rem) | 400 (Regular) | 1.50 (18px) | 0 | Metadata, timestamps, small labels |
| Caption Bold | PingFang SC | 12px (0.75rem) | 500 (Medium) | 1.50 (18px) | 0 | Navigation items, emphasized labels |
| Code | Menlo/Consolas | 12px (0.75rem) | 400 (Regular) | 1.50 (18px) | 0 | Inline code, technical data |

### Principles
- **Compact density over expression**: Huawei Cloud uses smaller font sizes (12px–14px) compared to consumer design systems. This reflects the console's purpose — displaying maximum data in minimum space. There are no display-size headlines.
- **Two functional weights**: 400 (Regular) for body and reading text, 500 (Medium) for headings, labels, and emphasis. Weight 600+ is rarely used, keeping the UI calm and uniform.
- **Chinese-first type scale**: Optimized for CJK characters — PingFang SC provides excellent readability at 12px–14px for Chinese text. English fallbacks ensure consistent rendering.
- **No letter-spacing adjustments**: Unlike some design systems, Huawei Cloud does not apply tracking adjustments at any size. The default letterforms provide sufficient spacing at all scales.

## 4. Component Stylings

### Buttons

**Primary Button (Blue)**
- Background: `#0066FF` (Huawei Blue) → `--hw-primary`
- Text: `#FFFFFF`
- Padding: 8px 16px
- Border: 1px solid `#0066FF`
- Border-radius: 4px
- Height: 32px (default), 28px (small), 36px (large)
- Hover: `#0052CC` (Blue 70) → `--hw-primary-hover`
- Active: `#003D99` (Blue 80) → `--hw-primary-active`
- Focus: `1px solid #0066FF` outline offset

**Secondary Button (White with Blue Border)**
- Background: `#FFFFFF`
- Text: `#0066FF`
- Border: 1px solid `#0066FF`
- Hover: `#E6F0FF` (Blue 10) background
- Same padding/radius as primary

**Text Button (Ghost Blue)**
- Background: transparent
- Text: `#0066FF`
- Border: none
- Padding: 4px 8px
- Hover: text darkens to `#0052CC`

**Danger Button (Red)**
- Background: `#FF4D4F` (Red 50)
- Text: `#FFFFFF`
- Border: 1px solid `#FF4D4F`
- Hover: `#D9363E` (Red 60)

### Cards & Containers
- Background: `#FFFFFF` on `#F5F7FA` page
- Border: `1px solid #E8E8E8` — borders are the primary separation mechanism
- Border-radius: 4px
- Box Shadow: `0 1px 2px rgba(0,0,0,0.05)` — minimal elevation
- Hover: not typically interactive; hover state reserved for clickable cards with `#F0F0F0` background
- Content padding: 16px
- Margin between cards: 16px

### Inputs & Forms
- Background: `#FFFFFF`
- Text: `#1A1A1A`
- Padding: 8px 12px
- Height: 32px (default), 36px (large)
- Border: `1px solid #E8E8E8`
- Border-radius: 4px
- Focus: `1px solid #0066FF` border
- Error: `1px solid #FF4D4F` border
- Label: 12px PingFang SC, weight 400, color `#666666`, typically placed above input
- Placeholder: `#999999` (Gray 400)
- Helper text: 12px, color `#999999`

### Tables
- Background: `#FFFFFF`
- Border: `1px solid #E8E8E8`
- Border-radius: 4px (on wrapper)
- Table Header:
  - Background: `#FAFAFA` (Gray 50)
  - Text: `#666666`, weight 500
  - Font size: 12px
  - Border-bottom: `1px solid #E8E8E8`
- Table Row:
  - Default: `#FFFFFF`
  - Hover: `#F0F0F0` (Gray 150)
  - Alternating: not used (rely on hover for row distinction)
  - Border-bottom: `1px solid #E8E8E8`
- Cell padding: 12px 16px
- Text: `#1A1A1A` at 12px–13px, weight 400
- Empty state: centered icon + descriptive text + CTA button

### Navigation

**Top Header**
- Background: `#FFFFFF`
- Height: 48px
- Border-bottom: `1px solid #E8E8E8`
- Logo: Huawei Cloud logo, left-aligned (red "H" mark)
- Navigation items: horizontal tabs, 14px, weight 400
  - Active: `#0066FF` text with bottom border indicator
  - Inactive: `#666666` text
  - Hover: text shifts to `#0066FF`
- Right section: region selector, search bar, notifications bell, user avatar/menu

**Left Sidebar**
- Background: `#FFFFFF`
- Width: ~200px (fixed)
- Border-right: `1px solid #E8E8E8`
- Navigation items:
  - Font: 14px, weight 400
  - Default: `#666666` text
  - Active: `#0066FF` text with 2px left border indicator
  - Hover: `#F0F0F0` background
  - Icon: 16px inline SVG, left of label
  - Hot badge: orange (`#FA8C16`) indicator dot or tag
  - Expandable sections with chevron icon

**Breadcrumbs**
- Font: 12px, color `#999999`
- Separator: `/` or `>`
- Current page: `#666666` (not clickable)

### Links
- Default: `#0066FF` with no underline
- Hover: `#0052CC` with underline
- Visited: remains `#0066FF` (no visited state)
- Action links in tables: `#0066FF`, underlined on hover

### Status Badges
- **Success/Completed**: `#F6FFED` background, `#52C41A` text, `2px` border-radius, `4px 8px` padding, 12px font
- **Warning/Pending**: `#FFF7E6` background, `#FA8C16` text
- **Error/Failed**: `#FFF1F0` background, `#FF4D4F` text
- **Info/Default**: `#E6F0FF` background, `#0066FF` text

### Distinctive Components

**Flow Diagram / Process Guide**
- Step-based visual guide with numbered circles
- Connected by lines or arrows
- Current step highlighted with `#0066FF`
- Completed steps marked with `#52C41A` checkmark
- Descriptive text below each step

**Region Selector**
- Dropdown showing current region (e.g., "华北-北京四")
- Icon-triggered expand
- Compact size fitting within header

**Hot Tags**
- Orange (`#FA8C16`) indicator for new or important sidebar menu items
- Small dot or tag, typically top-right of menu item

**Notification Badge**
- Red (`#FF4D4F`) circular badge on notification icon
- White number text on red background
- Border-radius: 50% (circular)

**Empty State**
- Centered layout within card/table
- Illustration or large icon (64px+)
- Descriptive text at 14px, `#666666`
- CTA button below (primary blue)

## 5. Layout Principles

### Spacing System
- Base unit: 4px (Huawei Cloud uses a 4px grid for fine-grained control)
- Component spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px
- Padding within components: 12px–16px
- Gap between cards: 16px
- Sidebar width: ~200px fixed
- Content margin: 16px–24px

### Grid & Container
- 12-column grid for main content area (more conventional than IBM's 16-column)
- Content area: fills remaining width after sidebar
- Max content width: fluid within available space
- Column gutters: 16px
- Section padding: 16px (within cards), 24px (between major sections)

### Whitespace Philosophy
- **Functional density**: Huawei Cloud favors dense, information-rich layouts. Console users need to see data, not whitespace. Sections are tightly packed — this reflects the platform's enterprise operations DNA.
- **Border-driven separation**: Instead of large padding or alternating backgrounds, Huawei Cloud uses `1px solid #E8E8E8` borders to create visual separation between sections. This allows tighter spacing without visual confusion.
- **Card-based organization**: Content is organized into white cards on gray background. Each card is a self-contained information unit with its own padding and border.
- **Consistent 16px rhythm**: Standard vertical and horizontal spacing between components is 16px. Major section transitions use 24px.

### Border Radius Scale
- **0px**: Not used — Huawei Cloud avoids sharp rectangles
- **2px**: Small tags, status badges
- **4px**: Primary treatment — buttons, inputs, cards, tables, dropdowns, modals. The dominant border-radius value.
- **50%**: Avatar circles, notification badges (circular elements only)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, `#F5F7FA` background | Default page surface |
| Layer 01 | `0 1px 2px rgba(0,0,0,0.05)`, `#FFFFFF` background | Cards, containers |
| Layer 02 | `0 2px 8px rgba(0,0,0,0.08)`, `#FFFFFF` background | Dropdowns, popovers |
| Overlay | `0 4px 16px rgba(0,0,0,0.12)` + dark scrim | Modal dialogs, side panels |
| Focus | `1px solid #0066FF` border | Keyboard focus ring on inputs, buttons |
| Active border | `2px left #0066FF` border | Active sidebar navigation item |

**Shadow Philosophy**: Huawei Cloud is shadow-conservative. The system uses extremely subtle shadows (`0 1px 2px rgba(0,0,0,0.05)`) only on card-level elements that need to appear slightly elevated from the page background. For most separation needs, `1px solid #E8E8E8` borders are preferred over shadows — they're lighter weight visually and maintain the clean, flat aesthetic. Shadows increase in intensity for floating elements (dropdowns, modals) to clearly signal their elevated state. The approach is pragmatic: use the minimum shadow necessary to communicate hierarchy.

## 7. Do's and Don'ts

### Do
- Use 4px border-radius consistently on buttons, inputs, cards, and tables — this is the system's defining shape
- Apply Huawei Blue (`#0066FF`) as the sole accent color — for actions, links, active states, and focus rings
- Use `1px solid #E8E8E8` borders as the primary visual separator — borders, not shadows, define structure
- Keep body text at 12px–14px — information density is a feature, not a flaw
- Use PingFang SC as the primary font for Chinese content with system sans-serif fallbacks
- Apply weight 400 (Regular) for body text and weight 500 (Medium) for headings and labels
- Use `#F5F7FA` page background with `#FFFFFF` cards — the two-layer background system
- Implement `#FAFAFA` for table headers and subtle surface fills
- Use status badges with tinted backgrounds (e.g., `#F6FFED` for success, `#FFF1F0` for error)
- Place left border indicators on active sidebar items (2px `#0066FF`)
- Use subtle shadows only (`0 1px 2px rgba(0,0,0,0.05)`) on card-level elements

### Don't
- Don't use sharp 0px border-radius — Huawei Cloud's language is consistently 4px rounded
- Don't introduce heavy shadows — the system relies on borders for separation
- Don't use display-size typography (42px+) — this is a console, not a marketing page
- Don't add letter-spacing adjustments — the default tracking works at all sizes
- Don't use weight 600+ (Semibold/Bold) — the scale stops at 500 (Medium)
- Don't introduce secondary accent colors — Huawei Blue is the only chromatic identity
- Don't use gradient backgrounds — all surfaces are flat, solid colors
- Don't apply box-shadow to table rows or inline elements — shadows are for cards and modals only
- Don't use pill-shaped (24px+) border-radius — the maximum is 4px for rectangular elements
- Don't add underlines to links by default — underline only on hover

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Small (sm) | 768px | Sidebar collapses to hamburger, single column |
| Medium (md) | 992px | Narrower sidebar (collapsible), 2-column grids |
| Large (lg) | 1200px | Full sidebar, standard density |
| X-Large (xl) | 1600px | Maximum content width, expanded tables |

### Touch Targets
- Button height: 32px (default), minimum 28px (small)
- Sidebar navigation: 40px row height
- Input height: 32px (default), 36px (large)
- Table row: 40px minimum
- Header actions: 32px–40px square touch target

### Collapsing Strategy
- Sidebar: full-width left panel → collapsible icon-only sidebar → hamburger menu with overlay
- Header: full horizontal navigation → scrollable horizontal tabs
- Tables: horizontal scroll on mobile, no column stacking
- Cards: multi-column grid → single column stack
- Form layouts: multi-column → single column
- Padding: 16px (desktop) → 12px (tablet) → 8px (mobile)

### Table Behavior
- Horizontal scroll on overflow (no responsive column hiding)
- Sticky header on scroll
- Action column fixed to right on wide tables
- Minimum column width enforced to prevent layout collapse

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Huawei Blue (`#0066FF`)
- Background: Light Gray (`#F5F7FA`)
- Heading text: Near Black (`#1A1A1A`)
- Body text: Near Black (`#1A1A1A`)
- Secondary text: Gray 600 (`#666666`)
- Tertiary text: Gray 400 (`#999999`)
- Surface/Card: White (`#FFFFFF`)
- Table header: Gray 50 (`#FAFAFA`)
- Border: Gray 200 (`#E8E8E8`)
- Hover: Gray 150 (`#F0F0F0`)
- Link: Blue (`#0066FF`)
- Link hover: Blue 70 (`#0052CC`)
- Focus ring: Blue (`#0066FF`)
- Error: Red (`#FF4D4F`)
- Success: Green (`#52C41A`)
- Warning: Orange (`#FA8C16`)

### Example Component Prompts
- "Create a page header bar: #FFFFFF background, 1px solid #E8E8E8 bottom border, 48px height. Logo left-aligned. Navigation tabs at 14px weight 400, #666666 inactive, #0066FF active with bottom border. Right side: search bar, notification bell with red badge, user avatar."
- "Design a data table card: #FFFFFF background, 4px border-radius, 0 1px 2px rgba(0,0,0,0.05) shadow. Header row: #FAFAFA background, 12px weight 500, #666666 text. Body rows: #1A1A1A text at 12px, #E8E8E8 bottom borders. Hover row: #F0F0F0 background. Cell padding: 12px 16px."
- "Build a sidebar navigation: #FFFFFF background, 200px width, 1px solid #E8E8E8 right border. Menu items at 14px, #666666 default, #0066FF active with 2px left border indicator. 16px inline SVG icons. Hot items: orange #FA8C16 indicator dot. Hover: #F0F0F0 background."
- "Create a form within a card: #FFFFFF background, 16px padding, 4px border-radius, 1px solid #E8E8E8 border. Labels at 12px, #666666, weight 400, placed above inputs. Inputs: 32px height, #FFFFFF background, 1px solid #E8E8E8 border, 4px border-radius, 8px 12px padding. Focus: 1px solid #0066FF border. Placeholder: #999999."
- "Build a status badge: Completed status with #F6FFED background, #52C41A text, 2px border-radius, 4px 8px padding, 12px font. Error status: #FFF1F0 background, #FF4D4F text."
- "Create a primary button: #0066FF background, #FFFFFF text, 1px solid #0066FF border, 4px border-radius, 8px 16px padding, 32px height. Hover: #0052CC background. Secondary variant: #FFFFFF background, #0066FF text, 1px solid #0066FF border."

### Iteration Guide
1. Always use 4px border-radius on buttons, inputs, cards, and tables — this is the consistent Huawei Cloud shape language
2. Two weights only: 400 (Regular) for body and 500 (Medium) for headings — no bold, no light
3. Body text at 12px–14px — compact density is by design, not a mistake
4. Huawei Blue (`#0066FF`) is the only accent — do not add secondary accent colors
5. Separation comes from `1px solid #E8E8E8` borders, not shadows — use minimal shadows only on elevated cards
6. Table headers use `#FAFAFA` background with `#666666` text at weight 500
7. Status indicators use tinted backgrounds: green for success, red for error, orange for warning
8. Left sidebar active state: `#0066FF` text with 2px left border indicator
9. Page background is always `#F5F7FA`, never white — white is reserved for cards and content surfaces
10. Input fields are fully bordered (all sides), not bottom-border only — different from Carbon/IBM pattern
