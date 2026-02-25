# Wedding Website Specification

## 1. Project Overview

**Project Name:** Wedding Royals - Elegant Wedding Website  
**Project Type:** Single-page wedding invitation website  
**Core Functionality:** A beautifully designed wedding website featuring couple details, event information, gallery, and RSVP functionality with smooth scroll animations  
**Target Users:** Wedding guests, friends, and family members

---

## 2. UI/UX Specification

### Layout Structure

**Sections (in order):**
1. **Hero Section** - Full viewport height, couple names, wedding date, scroll indicator
2. **Our Story Section** - Love story timeline with images
3. **Event Details Section** - Ceremony and Reception info with cards
4. **Gallery Section** - Photo grid showcasing wedding moments
5. **RSVP Section** - Event attendance form
6. **Footer** - Thank you message and couple's wish

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: `#1a1a2e` (Deep navy)
- Secondary: `#16213e` (Dark blue)
- Accent: `#d4af37` (Gold)
- Accent Light: `#f4e4bc` (Soft gold)
- Background: `#0f0f1a` (Near black)
- Text Primary: `#ffffff` (White)
- Text Secondary: `#b8b8b8` (Light gray)
- Card Background: `#1e1e32` (Dark purple-gray)

**Typography:**
- Headings: 'Cormorant Garamond', serif - elegant, classic
- Body: 'Montserrat', sans-serif - clean, modern
- Decorative: 'Great Vibes', cursive - for names/initials

**Font Sizes:**
- Hero Title: 5rem (mobile: 3rem)
- Section Titles: 3rem (mobile: 2rem)
- Subheadings: 1.5rem
- Body: 1rem
- Small: 0.875rem

**Spacing System:**
- Section Padding: 100px vertical (mobile: 60px)
- Container Max Width: 1200px
- Card Padding: 40px
- Element Gap: 30px

**Visual Effects:**
- Glassmorphism cards with subtle blur
- Gold gradient accents
- Soft box shadows with color tint
- Parallax background effects
- Grain texture overlay for vintage feel

### Components

**Navigation:**
- Fixed top navigation (appears on scroll)
- Logo/Names in center
- Smooth scroll to sections

**Hero Section:**
- Centered layout with decorative border
- Couple names with script font
- Wedding date with elegant styling
- Animated scroll-down indicator

**Story Cards:**
- Alternating left/right layout (stacked on mobile)
- Image with decorative frame
- Text content with elegant typography

**Event Cards:**
- Icon + Title + Details format
- Time, Location, Address information
- Hover lift effect

**Gallery:**
- Masonry-style grid
- Hover zoom effect
- Lightbox on click

**RSVP Form:**
- Guest name input
- Attendance radio buttons
- Meal preference dropdown
- Submit button with loading state

**Buttons:**
- Primary: Gold background, dark text
- Hover: Scale up + glow effect

### Animations (Marcelo Design X Inspired)

**Scroll Reveal Animations:**
- Elements fade in from bottom with stagger
- 0.1s delay between consecutive elements
- Duration: 0.8s with ease-out

**Parallax Effects:**
- Background layers move at different speeds
- Creates depth and dimension

**Hover Animations:**
- Scale: 1.05 transform
- Box shadow enhancement
- Color transitions

**Text Animations:**
- Split text reveal for headings
- Character-by-character or word-by-word

**Smooth Scrolling:**
- CSS scroll-behavior: smooth
- Intersection Observer for scroll-triggered animations

---

## 3. Functionality Specification

### Core Features

1. **Smooth Scroll Navigation**
   - Click nav links to scroll to sections
   - Active section highlighting in nav

2. **Scroll-Triggered Animations**
   - Elements animate in when entering viewport
   - Intersection Observer API implementation

3. **Parallax Backgrounds**
   - Subtle movement on scroll
   - Enhances visual depth

4. **Image Gallery**
   - Hover effects on images
   - Responsive grid layout

5. **RSVP Form**
   - Form validation
   - Success message on submit

6. **Mobile Menu**
   - Hamburger toggle
   - Full-screen overlay menu

### User Interactions

- Scroll to reveal content with animations
- Click navigation for smooth scroll
- Hover on cards/images for effects
- Fill and submit RSVP form
- Mobile menu toggle

### Edge Cases

- Graceful degradation without JavaScript
- Images have alt text
- Form has proper labels
- Focus states for accessibility

---

## 4. Acceptance Criteria

1. ✅ Hero section displays couple names and wedding date
2. ✅ Navigation is fixed and highlights active section
3. ✅ All sections have scroll-reveal animations
4. ✅ Parallax effect visible on backgrounds
5. ✅ Event details display ceremony and reception info
6. ✅ Gallery shows responsive image grid
7. ✅ RSVP form validates and shows success message
8. ✅ Mobile menu works on small screens
9. ✅ All colors match the specified palette
10. ✅ Typography uses specified font families
11. ✅ Smooth scroll works for all navigation links
12. ✅ Hover effects work on interactive elements

---

## 5. Technical Implementation

**File Structure:**
- `index.html` - Main HTML file
- `css/style.css` - All styles
- `js/script.js` - JavaScript functionality
- `assets/` - Images directory

**External Resources:**
- Google Fonts: Cormorant Garamond, Montserrat, Great Vibes
- Lucide Icons for icons

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
