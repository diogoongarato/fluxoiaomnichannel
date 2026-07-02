<!--
System Guidelines
-->

# General guidelines

* **Before creating any new interface, always read the "/showcase" route first** to review the established design patterns, colors, typography, and iconography defined in the style guide.
* Use the Inter font family exclusively across all UI elements
* Use responsive and well-structured layouts with flexbox and grid
* Keep file sizes small and modularize components into their own files
* Use Lucide React for all iconography (stroke-based, 1.5 stroke width)

--------------

# Design system guidelines

* Base font: Inter (Google Fonts)
* Primary text color: #181D27
* Secondary text color: #535862
* Muted text color: #717680
* Border/divider color: #D5D7DA
* Brand/accent color: #7F56D9 (Brand 600)

## Color Palette

### Primary Colors

* **Gray** — Neutral foundation for text, backgrounds, borders, dividers
  * 25: #FAFAFA | 50: #F5F5F5 | 100: #F0F0F0 | 200: #E4E4E4 | 300: #D5D7DA | 400: #A4A7AE
  * 500: #717680 | 600: #535862 | 700: #414651 | 800: #252B37 | 900: #181D27 | 950: #0A0D12

* **Brand** — Primary interactive color for buttons, links, inputs
  * 25: #FCFAFF | 50: #F9F5FF | 100: #F4EBFF | 200: #E9D7FE | 300: #D6BBFB | 400: #B692F6
  * 500: #9E77ED | 600: #7F56D9 | 700: #6941C6 | 800: #53389E | 900: #42307D | 950: #2C1C5F

* **Error** — Destructive/negative actions (e.g., delete, remove)
  * 25: #FFFBFA | 50: #FEF3F2 | 100: #FEE4E2 | 200: #FECDCA | 300: #FDA29B | 400: #F97066
  * 500: #F04438 | 600: #D92D20 | 700: #B42318 | 800: #912018 | 900: #7A271A | 950: #55160C

* **Warning** — Potentially destructive or on-hold states
  * 25: #FFFCF5 | 50: #FFFAEB | 100: #FEF0C7 | 200: #FEDF89 | 300: #FEC84B | 400: #FDB022
  * 500: #F79009 | 600: #DC6803 | 700: #B54708 | 800: #93370D | 900: #7A2E0E | 950: #4E1D09

* **Success** — Positive actions, confirmations, positive trends
  * 25: #F6FEF9 | 50: #ECFDF3 | 100: #D1FADF | 200: #A6F4C5 | 300: #6CE9A6 | 400: #32D583
  * 500: #12B76A | 600: #039855 | 700: #027A48 | 800: #05603A | 900: #054F31 | 950: #053321

### Secondary Colors

* **Blue gray**: 25: #FCFCFD → 950: #0D0F1C
* **Blue light**: 25: #F5FBFF → 950: #062C41
* **Blue**: 25: #F5FAFF → 950: #102A56
* **Indigo**: 25: #F5F8FF → 950: #1F235B
* **Purple**: 25: #FAFAFF → 950: #27115F
* **Pink**: 25: #FEF6FB → 950: #4E0D30
* **Rose**: 25: #FFF5F6 → 950: #510B24
* **Orange**: 25: #FFFAF5 → 950: #511C10

## Typography

Font family: Inter (Regular, Medium, Semibold, Bold)

### Type Scale

| Token | Font Size | Line Height | Tracking |
|---|---|---|---|
| Display 2xl | 72px / 4.5rem | 90px / 5.625rem | -2% |
| Display xl | 60px / 3.75rem | 72px / 4.5rem | -2% |
| Display lg | 48px / 3rem | 60px / 3.75rem | -2% |
| Display md | 36px / 2.25rem | 44px / 2.75rem | -2% |
| Display sm | 30px / 1.875rem | 38px / 2.375rem | — |
| Display xs | 24px / 1.5rem | 32px / 2rem | — |
| Text xl | 20px / 1.25rem | 30px / 1.875rem | — |
| Text lg | 18px / 1.125rem | 28px / 1.75rem | — |
| Text md | 16px / 1rem | 24px / 1.5rem | — |
| Text sm | 14px / 0.875rem | 20px / 1.25rem | — |
| Text xs | 12px / 0.75rem | 18px / 1.125rem | — |

### Font Weights

* Regular (400) — Body text, secondary labels
* Medium (500) — Emphasized body, form labels
* Semibold (600) — Subheadings, buttons
* Bold (700) — Headings, strong emphasis

## Icons

* Library: Lucide React (lucide-react)
* Style: Stroke-based, rounded line caps and joins
* Stroke width: 1.5px
* Available sizes: 16px, 20px, 24px
* Default color: #181D27 (Gray 900)
* Use 20px as default size for most UI elements
* Use 16px for compact UI (tables, small buttons)
* Use 24px for prominent actions and navigation

## Spacing

Consistent spacing scale for padding, margins, and gaps:

| Token | Value | Usage |
|---|---|---|
| micro | 4px | Icon gaps, inline spacing |
| xs | 8px | Tight element gaps, pill padding |
| sm | 12px | Button padding, input padding |
| md | 16px | Card inner gaps, element spacing |
| lg | 24px | Section inner gaps, nav gaps |
| xl | 32px | Section padding, header padding |
| 2xl | 48px | Between major content sections |
| 3xl | 64px | Page section padding, card grid gaps |
| 4xl | 96px | Hero vertical padding |
| 5xl | 160px | Hero max padding, footer bottom |

## Border Radius

Default component radius is 8px (md). Cards use 12px (lg). Pills/badges use full.

| Token | Value | Usage |
|---|---|---|
| none | 0px | No rounding |
| sm | 4px | Checkboxes, small elements |
| md | 8px | Buttons, inputs, nav pills, default |
| lg | 12px | Cards, alerts, modals |
| xl | 16px | Large cards, panels |
| 2xl | 24px | Feature sections |
| full | 9999px | Avatars, badges, pills, toggles |

## Effects / Shadows

Box shadow tokens for elevation hierarchy:

| Token | Value | Usage |
|---|---|---|
| xs | 0px 1px 2px rgba(16,24,40,0.05) | Inputs, small cards |
| sm | 0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06) | Buttons, dropdowns |
| md | 0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06) | Cards, popovers |
| lg | 0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03) | Modals, dialogs |
| xl | 0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03) | Floating panels |
| 2xl | 0px 24px 48px -12px rgba(16,24,40,0.18) | Elevated overlays |

## Component Patterns

### Buttons
* **Primary**: bg Brand 600 (#7F56D9), text white, hover Brand 700 (#6941C6), rounded 8px, padding 12px 20px
* **Secondary (Outline)**: bg white, border Gray 300 (#D5D7DA), text Gray 900, hover bg Gray 50, rounded 8px
* **Tertiary (Ghost)**: no background/border, text Brand 600 or Gray 600, hover bg Brand 25 or Gray 50
* **Destructive**: bg Error 600 (#D92D20), text white, hover Error 700 (#B42318)
* **Disabled**: opacity 50%, cursor not-allowed

### Inputs
* Padding: 10px 12px (with icon: pl 36px)
* Border: 1px solid Gray 300 (#D5D7DA)
* Border radius: 8px
* Shadow: xs (0px 1px 2px rgba(16,24,40,0.05))
* Focus: border Brand 600 (#7F56D9), ring 1px Brand 600
* Error: border Error 500 (#F04438), ring Error 500
* Hint text: 14px, Gray 600 (#535862)

### Cards
* Padding: 24px
* Border: 1px solid Gray 200 (#E4E4E4)
* Border radius: 12px
* Hover: border Brand 300 (#D6BBFB), shadow-md

### Badges / Pills
* Padding: 4px 10px
* Border radius: full (9999px)
* Use semantic background colors at shade 50, text at shade 600-700
* Available in filled and outline variants

### Alerts
* Padding: 16px
* Border radius: 12px
* Left accent border: 4px solid semantic color
* Background: semantic shade 50
* Icon + text layout with 12px gap

### Dividers
* Standard: 1px border-bottom, Gray 300 (#D5D7DA)
* Light: 1px border-bottom, Gray 200 (#E4E4E4)

### Avatars
* Sizes: 24px, 32px, 40px, 48px, 64px
* Border radius: full
* Background: Brand 100 (#F4EBFF), icon color Brand 600 (#7F56D9)