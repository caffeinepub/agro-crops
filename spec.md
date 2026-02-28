# Specification

## Summary
**Goal:** Add a Customer Details form inside the cart drawer and create a dedicated Government Schemes page for Indian farmers.

**Planned changes:**
- In the cart sheet drawer (Header.tsx), add a Customer Details form (Full Name, Delivery Address, Phone Number) that appears when the cart has at least one item, with a "Proceed to Checkout" button that validates all fields, shows a success message, and clears the cart on submission
- Create a new `GovernmentSchemes.tsx` page at route `/schemes` displaying at least 6 Indian government scheme cards (PM-KISAN, PMFBY, KCC, NMSA, Soil Health Card, PMKSY), each with scheme name, description, key benefits, and eligibility note, with slideUp scroll animations
- Register the `/schemes` route in App.tsx (authenticated users only)
- Add a "Government Schemes" navigation link in the Header nav bar pointing to `/schemes`

**User-visible outcome:** Users can fill in their delivery details directly in the cart and place a simulated order, and farmers can browse a dedicated page with detailed information on 6 government agricultural schemes via the navigation bar.
