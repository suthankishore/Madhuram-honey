# Madhuram Honey — V1

## Project Overview

Madhuram Honey V1 is a premium, natural-honey brand website focused on building trust, presenting the brand story, showing one core honey product, and sending customers to WhatsApp for ordering.

**V1 business model:** Website → Product → WhatsApp Order

V1 is not an e-commerce checkout system.

## Final Page Structure

1. Navbar
2. Hero
3. Why Choose Madhuram Honey
4. Our Honey — Product + Order Card
5. How It Works
6. Our Story
7. Trust / Reviews
8. FAQ
9. Final CTA
10. Contact
11. Footer

## Navbar

Desktop:
- Home
- Why Us
- Our Honey
- Our Story
- FAQ
- Contact
- Order on WhatsApp

Mobile:
- Logo
- Hamburger menu
- Same navigation links inside mobile menu
- WhatsApp CTA available appropriately

## Hero

Headline:

**Pure Nature.**  
**Bottled With Care.**

Supporting text communicates authentic, carefully sourced honey.

Buttons:
- Order on WhatsApp
- Explore Our Honey

Trust points:

**✓ Pure   ✓ Natural   ✓ No Added Sugar**

Use the finalized Madhuram Honey product image.

## Why Choose Madhuram Honey

Four cards:
1. 100% Pure & Raw
2. Quality & Freshness Focus
3. Hygienic Glass Packaging
4. Proud Local Brand

Keep descriptions concise, especially on mobile.

## Our Honey — Product + Order Card

V1 has **only one product**.

- Product: Madhuram Honey
- Size: **750 ml**
- Price: **₹650**
- Finalized bottle image
- Short product description
- Quantity selector
- Order on WhatsApp CTA

No cart is required in V1.

## How It Works

Five steps:

1. Sourcing
2. Processing
3. Quality Care
4. Packaging
5. Your Home

Dark green section, horizontal timeline on desktop, stacked/vertical on mobile.

Hover:
- Number circle becomes filled
- Gold accent
- Subtle transition

## Our Story

Heading: **A Sweet Beginning**

Use the approved beekeeping/story image and these supporting points:
- Inspired by Nature
- Made With Care
- Trusted For Quality

Brand quote:

**“Serving Pure Is Our Aim.”**

## Trust / Reviews

Do not create fake customer reviews.

When real reviews are available, show:
- Customer quote
- Customer name
- Optional rating

Until then, use trust-focused brand information.

## FAQ

Clean accordion:
- One question opens at a time
- Short answers
- Large enough touch targets
- Minimal decoration

## Final CTA

Headline:

**Bring Nature's Sweetness Home.**

Buttons:
- Order on WhatsApp
- Contact Us

Design:
- Deep green background
- Cream/white typography
- Honey-gold primary CTA
- Outlined secondary CTA
- Curved/wave top edge matching the finalized reference

## Contact

Final layout:
- Phone
- WhatsApp
- Instagram
- Location
- Right-side map placeholder

Mobile: contact information first, map below.

## Footer

Compact dark-green footer:
- Logo
- Short brand description
- Quick Links
- WhatsApp
- Instagram
- Copyright

## V1 Exclusions

Not included:
- Online payment
- Cart system
- Customer login/accounts
- Order history
- Order tracking
- Delivery tracking
- Admin dashboard
- Multiple product management
- Inventory management
- Automated order management

These belong to V2/V3.

## Global Design Direction

Brand feeling:

**Natural + Premium + Honest + Local**

Visual language:
- Deep forest green
- Warm cream
- Honey/gold accent
- Clean white surfaces
- Soft borders
- Subtle shadows
- Premium serif display typography
- Clean sans-serif body typography

Avoid excessive gradients, animations, colors, crowded layouts, generic stock UI, fake testimonials, and unnecessary cards.

## Responsive Requirements

Desktop, tablet, and mobile must all be deliberately designed.

Mobile rules:
- Hero stacks naturally
- Product remains prominent
- Buttons stay easy to tap
- Trust points remain on one line when space allows
- Cards become compact
- Long descriptions are shortened
- Process becomes vertically readable
- Contact stacks
- Footer stays compact

## Asset Folder Structure

```text
public/
└── assets/
    ├── logo/
    │   └── madhuram-honey-logo.*
    ├── products/
    │   └── madhuram-honey-750ml.*
    ├── story/
    │   └── beekeeping-story.*
    ├── social/
    │   └── instagram-preview.*
    └── icons/
        └── ...
```

## Image Placement

| Asset | Use |
|---|---|
| Madhuram Honey 750 ml product image | Hero + Our Honey product card |
| Beekeeping/story image | Our Story |
| Logo | Navbar + Footer |
| Instagram/social image, if approved | Optional social/trust area |
| Icons | Why Us, Story, Contact, FAQ |

### Product image

Put the finalized bottle image at:

```text
public/assets/products/madhuram-honey-750ml.*
```

### Story image

Put the finalized beekeeping image at:

```text
public/assets/story/beekeeping-story.*
```

### Logo

```text
public/assets/logo/madhuram-honey-logo.*
```

Do not use random images just to fill empty space.

## Final Conversion Principle

**Discover → Trust → Product → Order on WhatsApp**
