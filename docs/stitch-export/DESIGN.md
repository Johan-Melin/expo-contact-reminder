---
name: Warm Connection
colors:
  surface: '#fbf8ff'
  surface-dim: '#d5d8f9'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#ececff'
  surface-container-high: '#e5e6ff'
  surface-container-highest: '#dee0ff'
  on-surface: '#161a32'
  on-surface-variant: '#404943'
  inverse-surface: '#2b2f48'
  inverse-on-surface: '#f0efff'
  outline: '#707973'
  outline-variant: '#bfc9c1'
  surface-tint: '#2c694e'
  primary: '#0f5238'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#a8e7c5'
  inverse-primary: '#95d4b3'
  secondary: '#005fad'
  on-secondary: '#ffffff'
  secondary-container: '#58a3fe'
  on-secondary-container: '#003869'
  tertiary: '#434a38'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b624e'
  on-tertiary-container: '#d6ddc4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f0ce'
  primary-fixed-dim: '#95d4b3'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#0e5138'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004884'
  tertiary-fixed: '#dee6cc'
  tertiary-fixed-dim: '#c2c9b1'
  on-tertiary-fixed: '#171e0e'
  on-tertiary-fixed-variant: '#424937'
  background: '#fbf8ff'
  on-background: '#161a32'
  surface-variant: '#dee0ff'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-padding: 20px
  gutter: 12px
---

## Brand & Style

The brand personality is empathetic, nurturing, and dependable. It acts as a digital gardener for social circles, focusing on the "growth" of relationships rather than the "management" of data. The target audience consists of busy individuals who value meaningful connections but struggle with the cognitive overhead of modern social maintenance.

The design style is **Tactile Modernism**. It blends the cleanliness of functional minimalism with soft, physical metaphors to create an approachable interface. By using "squishy" surface interactions and organic depth, the UI avoids the coldness of traditional CRMs, instead evoking the feeling of a well-organized personal journal or a comfortable lounge.

## Colors

This design system utilizes a palette rooted in nature to signify growth and reliability. 

- **Primary (Deep Forest):** A grounding green used for core actions and active states, representing the maturity of long-term relationships.
- **Secondary (Sky Blue):** A friendly, optimistic blue used for reminders, notifications, and "new" interactions.
- **Tertiary (Soft Mint):** A very pale, warm wash used for background surfaces to reduce eye strain and differentiate content areas without harsh lines.
- **Neutrals:** Warmer grays with blue undertones are used for text to maintain a soft contrast ratio, ensuring high legibility without the starkness of pure black.

## Typography

The typography strategy prioritizes warmth and clarity on small viewports. **Plus Jakarta Sans** is used for headlines to provide a friendly, slightly rounded geometric feel that welcomes the user. **Be Vietnam Pro** is selected for body copy and labels due to its exceptional readability and contemporary, approachable tone.

Line heights are intentionally generous to improve the "breathed-out" feel of the layout, preventing information density from becoming overwhelming. Headlines use a slight negative letter-spacing to feel more cohesive on mobile screens.

## Layout & Spacing

This design system uses a **Fluid Mobile-First Grid**. On mobile devices, the layout relies on a single-column structure with 20px safe-area margins. As the viewport expands, the system transitions to a max-width 600px container for handheld-centric web viewing, ensuring reachability for thumbs.

Spacing follows a 4px base unit, but emphasizes the `md` (16px) and `lg` (24px) increments to ensure plenty of "air" between touch targets. Elements are grouped using proximity; related contact details use `sm` (8px) spacing, while distinct sections are separated by `xl` (32px).

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and tonal layering. Rather than sharp shadows, this system uses highly diffused, low-opacity dropshadows tinted with the primary green color (`rgba(45, 106, 79, 0.08)`). 

- **Level 0 (Base):** The Tertiary Soft Mint background.
- **Level 1 (Cards/Inputs):** White surfaces with a soft 4px blur shadow.
- **Level 2 (Active/Floating):** White surfaces with an 8px blur shadow, used for buttons or active reminders that need to appear "tappable" and elevated.

This depth strategy mimics physical paper cards sitting on a soft desk, making the digital experience feel more grounded and less abstract.

## Shapes

The shape language is consistently **Rounded**. A base radius of 8px-12px is applied to all interactive elements to remove "sharpness" from the UI. 

- Standard components (Inputs, Small Cards) use **0.5rem (8px)**.
- Container elements and large cards use **1rem (16px)**.
- Avatars and status indicators use a full circle/pill shape to represent the organic nature of people and connection.

## Components

### Buttons & Inputs
Primary buttons should be tall (minimum 48px height) for easy mobile tapping, featuring a subtle gradient and rounded corners. Input fields use a Level 1 elevation with a soft border that thickens slightly on focus.

### Relationship Cards
The central component of the system. These cards group a contact's photo, last interaction date, and a "next step" prompt. They should use `rounded-lg` corners and significant internal padding (20px) to prevent data from feeling cramped.

### Chips & Tags
Used for categorizing social circles (e.g., "Family," "Work"). These should be pill-shaped with low-saturation background tints from the primary or secondary colors to avoid visual noise.

### Progress Indicators
Small, organic "growth rings" around contact avatars that visually represent the time elapsed since the last interaction, using the Secondary Blue to show a "cooling" or "warming" relationship.

### Bottom Navigation
A persistent mobile-first nav bar with large icons and clear text labels, using Level 2 elevation to stay separated from the scrolling content.