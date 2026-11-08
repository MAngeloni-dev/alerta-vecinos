---
name: Seguridad Vecinal Argentina
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.015em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
---

## Brand & Style
This design system defines a civic security and neighborhood mutual-protection mobile ecosystem adapted specifically for urban and suburban community contexts in Argentina. The brand personality balances institutional authority, calm reassurance, and hyper-local neighborliness. In stressful or urgent situations, the interface must project rapid clarity without inducing panic, replacing ambiguity with resolute actionable steps.

The visual style is rooted in a refined **Corporate / Modern Civic Utility** with tactile, humanistic considerations. It relies on clean, high-contrast surfaces, generous touch targets, distinct semantic color-coding, and friendly geometric typography. Rather than looking cold, sterile, or militaristic, the interface feels like an organized, modern digital neighborhood council: dependable, protective, welcoming, and accessible to multi-generational demographics ranging from teenagers walking home from school to senior community leaders.

## Colors
The color architecture operates on strict functional semantic hierarchy to avoid cognitive overload while walking or in high-stress situations:

- **Institutional Safety Blue (`#2563EB`)**: Primary action, brand header elements, primary interactive buttons, and trusted network signals. It communicates serenity, institutional reliability, and civic coordination.
- **Safe Zone & Verified Green (`#10B981`)**: Secondary accent, utilized exclusively for confirmed secure routes, active "Paradas Seguras", verified neighbour identities, and resolved incident status.
- **Community Warning Amber (`#F59E0B`)**: Tertiary accent for preventative notifications, community advice, utility disruptions, or neighborhood watch updates requiring attention but not immediate dispatch.
- **Critical Emergency Red (`#EF4444`)**: Strictly quarantined for lethal risk, the dedicated SOS panic button, live 911/emergency services dispatch, and immediate danger zone banners. Never used for mundane dismissals or standard form errors.
- **Surface & Canvas System**: Base canvas background `#F8FAFC` (Slate 50) paired with pristine elevated card surfaces `#FFFFFF`. Borders use `#E2E8F0` (Slate 200). Text relies on high-contrast `#0F172A` (Slate 900) for primary copy and `#475569` (Slate 600) for secondary details to ensure minimum WCAG AAA compliance for critical reading.

## Typography
The typographic pair solves for two distinct needs: rapid visual wayfinding and prolonged text legibility under outdoor glare.

- **Headlines & Titles (Outfit)**: A geometric sans-serif that brings clean structure, approachable roundness, and instant clarity. It renders greeting banners, screen section titles, and action modal titles with authority without intimidating users.
- **Body & Data Labels (Inter)**: Renowned for exceptional x-height, distinct letterforms (disambiguating 'I', 'l', and '1'), and open apertures. It ensures senior neighbors and stressed individuals can parse street addresses, incident timestamps, and instructions effortlessly in daylight or night conditions.
- **Scale Behavior**: Large headings are capped at 32px on the baseline 390px mobile viewport to guarantee titles never wrap unexpectedly or push critical interactive modules below the immediate thumb zone.

## Layout & Spacing
This design system prioritizes a **Mobile-First 390px viewport** based on modern handheld ergonomic realities, structured around a strict 4px/8px incremental rhythm:

- **Horizontal Margins**: A constant `margin` of `1rem` (16px) defines outer canvas padding from the screen edge, safeguarding content from bezels and rounded device corners.
- **Grid Layout**: A 4-column fluid mobile grid with `1rem` (16px) gutters. Primary quick-action modules (such as 'Mapa de Riesgo' and 'Alertas Cercanas') arrange into balanced 2x2 grids (`span-2`), while operational navigation rows utilize full-width single-column spans (`span-4`).
- **Thumb Zone Hierarchy**: Critical touch elements and dispatch utilities live within the natural 120px-360px vertical band from the bottom edge of the screen, ensuring comfortable one-handed operation while commuting.
- **Vertical Rhythm**: Related module headers and internal contents use `space-xs` (4px) to `space-sm` (8px). Gaps between distinct thematic sections utilize `space-xl` (24px) to create clear optical separation without needing heavy divider lines.

## Elevation & Depth
Depth conveys interactive affordance without visual noise. Surfaces maintain a calm, grounded appearance using multi-tiered ambient shadows paired with crisp structural borders:

- **Level 0 (Canvas)**: Background `#F8FAFC` flat surface.
- **Level 1 (Card & Action Tiles)**: Background `#FFFFFF`, bordered by a subtle 1px line of `#E2E8F0`. Shadow: `0px 2px 6px -1px rgba(15, 23, 42, 0.05), 0px 1px 3px -1px rgba(15, 23, 42, 0.03)`. This gives tactile lift to tap targets like 'Paradas Seguras' and 'Alertas Cercanas'.
- **Level 2 (Floating Action Bars / Fixed Navigation)**: Background `rgba(255, 255, 255, 0.95)` with backdrop blur `12px`. Bordered top by `#E2E8F0`. Shadow: `0px 8px 16px -2px rgba(15, 23, 42, 0.08)`.
- **Level 3 (SOS Critical Trigger & Overlays)**: Shadow: `0px 12px 24px -4px rgba(239, 68, 68, 0.25)`. A soft, ambient crimson glow applied strictly to the emergency dispatch interface, giving immediate priority to urgent actions.

## Shapes
A roundedness level of `2` provides a protective, approachable geometry with softened corners that feel friendly and modern:

- **Primary Cards & Action Modules**: Rendered with an exact corner radius of `16px` (`rounded-lg`), creating comfortable touchable surfaces.
- **Navigation Buttons & Input Fields**: Configured at `12px` to `16px` border-radius to match card geometry.
- **Badges, Tags & Floating Pills**: Employ complete pill radii (`9999px`) to immediately signal status indicators, category metadata, and permission tags.
- **Icon Containers**: Nested within cards at `12px` roundedness to provide soft, harmonious internal framing.

## Components

### Buttons & Interactive Touch Targets
- **Dimensions**: All primary and secondary interactive surfaces have a strict minimum height of `48px` (recommended `52px` for primary calls to action) with minimum tap pads of `48x48px` to guarantee error-free triggering on mobile devices.
- **Primary Action (Blue)**: `#2563EB` solid fill, `#FFFFFF` text, `Outfit Medium`, `rounded-lg` (16px). Active press states darken to `#1D4ED8`.
- **SOS / Emergency Action (Red)**: `#EF4444` solid fill, white text, bold icon, subtle pulse ring effect. Kept visually isolated to avoid misclicks.
- **Secondary / Outlined Action**: Background `#FFFFFF`, border 1px `#CBD5E1`, text `#0F172A`.

### Action Cards (Quick Access 2x2 Grid)
- **Geometry**: Aspect ratio close to 1:1 or 4:3, full width divided across 2 columns.
- **Visual Styling**: `#FFFFFF` background, 1px border in `#E2E8F0`, 16px corner radius, internal padding of `space-md` (16px).
- **Icon Badges**: 40x40px icon holder centered or top-aligned with soft tonal backgrounds:
  - Blue modules (Mapa de Riesgo): Tint `#EFF6FF`, icon `#2563EB`.
  - Green modules (Paradas Seguras): Tint `#ECFDF5`, icon `#10B981`.
  - Amber modules (Consejos / Alertas): Tint `#FEF3C7`, icon `#D97706`.

### List Navigation Items (Reportes, Emergencias, Perfil)
- **Geometry**: Horizontal card rows, minimum height `56px`, horizontal padding `16px`, corner radius `16px`, background `#FFFFFF`, border 1px `#E2E8F0`.
- **Anatomy**: Left-aligned icon wrapper (36x36px tonal background), central title in `Inter SemiBold` 15px, and right-aligned subtle trailing chevron `#94A3B8`.

### Badges & Role Badges (Administración)
- **Exclusive Role Badge**: Pill-shaped badge (`9999px` radius) placed adjacent to the 'Administración' cell or user title.
- **Admin Styling**: Dark slate fill `#0F172A` with `#F8FAFC` label text, or high-contrast deep indigo `#1E1B4B` with `#818CF8` text and lock icon, making it instantly recognizable as a privileged clearance zone.
- **Status Tags**:
  - *Verificado / Seguro*: `#ECFDF5` background, `#065F46` text.
  - *Precaución*: `#FEF3C7` background, `#92400E` text.
  - *Crítico*: `#FEF2F2` background, `#991B1B` text.

### Input Fields & Search Bars
- **Styling**: Height `48px`, background `#FFFFFF`, border 1.5px `#CBD5E1`, rounded `12px`. Left icon in `#64748B`. Placeholder text in `Inter` 14px `#94A3B8`. Focus state transitions to a 2px stroke in `#2563EB` with an ambient glow of `rgba(37, 99, 235, 0.15)`.