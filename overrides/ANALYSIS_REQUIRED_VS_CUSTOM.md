# Overrides Analysis: Required vs Custom Files

This document identifies which files in `overrides/app/` are **REQUIRED** for multi-site, Page Designer, and site-specific theme functionality, versus which are **CUSTOM** implementations that can potentially be removed.

## 🎯 Quick Summary

### ✅ MUST KEEP (Core Functionality)
- **Multi-Site Theme**: `app/theme/` (entire directory)
- **Theme Integration**: `app/components/_app-config/index.jsx` (line 111)
- **Page Designer**: `app/pages/experience/` (entire directory)
- **Page Designer Route**: `app/pages/page/[pageId]/index.jsx`
- **Routes**: `/page/:pageId` route in `app/routes.jsx`

### ⚠️ REVIEW & DECIDE (Currently Used)
- Custom Header/Footer (used in `_app/index.jsx`)
- Custom Auth Hook (used in 3 places)
- Custom Pages (used in routes)
- SSR.js CORS config (if not using SFRA)

### ✅ SAFE TO REMOVE (Examples/Demos)
- `app/pages/my-new-route/` - Example route
- `app/pages/style-guide/` - Style guide

---

## ✅ REQUIRED FILES (Keep These)

### Multi-Site & Site-Specific Theme

#### Core Theme System
- ✅ `app/theme/index.js` - Theme factory with `createTheme()` function
- ✅ `app/theme/sites/` - **ENTIRE DIRECTORY** - Site-specific theme configurations
  - `sites/refarch/` - RefArch site theme
  - `sites/my-store/` - my-store site theme
- ✅ `app/theme/shared/` - **ENTIRE DIRECTORY** - Shared foundations across sites
  - `shared/foundations/` - Shared fonts, styles, textStyles, layerStyles
  - `shared/components/` - Shared component styles
- ✅ `app/theme/README.md` - Documentation
- ✅ `app/theme/MIGRATION_GUIDE.md` - Migration guide (optional but helpful)

#### Theme Integration
- ✅ `app/components/_app-config/index.jsx` - **CRITICAL** - Line 111 integrates theme:
  ```javascript
  <ChakraProvider theme={createTheme(locals.site?.id)}>
  ```

### Page Designer

#### Core Page Designer System
- ✅ `app/pages/experience/` - **ENTIRE DIRECTORY** - Page Designer implementation
  - `experience/components/` - Component registry and custom components
    - `components/index.js` - Component registry
    - `components/commerce_assets/` - Commerce Assets components
    - `components/commerce_layouts/` - Commerce Layouts components
  - `experience/core/` - Core rendering system
    - `core/ComponentRenderer.jsx` - Renders individual components
    - `core/Region.jsx` - Renders page regions
    - `core/PageRenderer.jsx` - Renders complete pages
    - `core/usePreviewMode.js` - Preview mode hook
    - `core/index.js` - Exports
  - `experience/pages/` - Page type registry
    - `pages/index.js` - Page registry
    - `pages/storePage/` - StorePage page type
    - `pages/pwaPage/` - PWAPage page type
  - `experience/index.js` - Main exports

#### Page Designer Route Integration
- ✅ `app/pages/page/[pageId]/index.jsx` - Dynamic page route that uses PageRenderer
- ✅ `app/routes.jsx` - **REQUIRES** `/page/:pageId` route (lines 43-44)

---

## ⚠️ CUSTOM FILES (Review & Potentially Remove)

### Custom Components (Currently Used - Review If Needed)

- ⚠️ `app/components/header/index.jsx` - **USED** in `_app/index.jsx` (line 40)
  - Custom header with marketing consent support
  - **Decision**: Keep if you need custom header, remove if using base header
  
- ⚠️ `app/components/footer/index.jsx` - **USED** in `_app/index.jsx` (line 45)
  - Custom footer with newsletter form
  - **Decision**: Keep if you need custom footer, remove if using base footer
  
- ⚠️ `app/components/footer/newsletter-form.jsx` - **USED** by footer
  - Newsletter form component
  - **Decision**: Keep if using newsletter functionality
  
- ⚠️ `app/components/icons/index.jsx` - Custom icons
  - **Decision**: Review if used elsewhere, remove if not needed
  
- ⚠️ `app/components/with-registration/index.jsx` - **USED** by registration page
  - Registration wrapper component
  - **Decision**: Keep if using custom registration

### Custom Hooks (Currently Used - Review If Needed)

- ⚠️ `app/hooks/use-auth-modal.js` - **USED** in multiple places:
  - `_app/index.jsx` (line 57)
  - `checkout/partials/contact-info.jsx` (line 36)
  - `components/with-registration/index.jsx` (line 9)
  - Custom auth modal with marketing consent support
  - **Decision**: Keep if you need custom auth modal, remove if using base auth
  
- ⚠️ `app/hooks/use-custom-api.js` - **USED** in:
  - `components/footer/newsletter-form.jsx` (line 24)
  - Custom API hook (uses siteId)
  - **Decision**: Keep if using custom API calls, remove if not needed

### Custom Pages (Not Required for Core Functionality)

- ⚠️ `app/pages/home/index.jsx` - Custom home page
- ⚠️ `app/pages/product-detail/index.jsx` - Custom product detail page
- ⚠️ `app/pages/product-detail/index.mock.js` - Mock data
- ⚠️ `app/pages/product-detail/index.test.js` - Tests
- ⚠️ `app/pages/product-detail/partials/information-accordion.jsx` - Product detail partial
- ⚠️ `app/pages/my-new-route/index.jsx` - Example custom route
- ⚠️ `app/pages/style-guide/index.jsx` - Style guide page
- ⚠️ `app/pages/registration/index.jsx` - Custom registration page
- ⚠️ `app/pages/newsletter-form/index.js` - Newsletter form page
- ⚠️ `app/pages/account/profile.jsx` - Account profile page
- ⚠️ `app/pages/checkout/partials/contact-info.jsx` - Checkout partial

### Custom Routes (Review)

- ⚠️ `app/routes.jsx` - Contains custom routes:
  - `/` → Home (custom)
  - `/my-new-route` → MyNewRoute (custom)
  - `/product/:productId` → ProductDetail (custom)
  - `/style-guide` → StyleGuide (custom)
  - `/registration` → Registration (custom)
  - `/page/:pageId` → PageDetail (**REQUIRED** for Page Designer)

### Custom Utilities & Config

- ⚠️ `app/constants.js` - Custom constants
- ⚠️ `app/request-processor.js` - Custom request processor
- ⚠️ `app/schemas/newsletter.js` - Newsletter schema
- ⚠️ `app/main.jsx` - May have customizations

### SSR Configuration (Review)

- ⚠️ `app/ssr.js` - Contains:
  - CORS configuration for SFRA (may not be needed if pure headless)
  - Hybrid Proxy config (development only, should be disabled)
  - Security headers (may be needed)
  - SLAS authentication (may be needed)
  - Marketing Cloud integration (may be needed)

### Custom Assets

- ⚠️ `app/assets/svg/brand-logo.svg` - Custom logo
- ⚠️ `app/static/img/hero.png` - Custom hero image
- ⚠️ `app/static/fonts/README.md` - Font documentation

### App Component Overrides

- ⚠️ `app/components/_app/index.jsx` - May have customizations (check if it imports custom header/footer)

---

## 📋 RECOMMENDATIONS

### Safe to Remove (If Not Using)

1. **Example/Demo Pages:**
   - ✅ `app/pages/my-new-route/` - Example route (safe to remove)
   - ✅ `app/pages/style-guide/` - Style guide (safe to remove)

2. **Custom Components (Review Dependencies First):**
   - ⚠️ `app/components/header/` - **Currently used** in `_app/index.jsx`
     - Remove only if replacing with base header AND updating `_app/index.jsx`
   - ⚠️ `app/components/footer/` - **Currently used** in `_app/index.jsx`
     - Remove only if replacing with base footer AND updating `_app/index.jsx`
   - ⚠️ `app/components/icons/` - Check if used elsewhere before removing
   - ⚠️ `app/components/with-registration/` - **Currently used** by registration page

3. **Custom Pages (Review Dependencies First):**
   - ⚠️ `app/pages/home/` - **Used** in routes.jsx (line 21, 30-32)
     - Remove only if removing route AND using base home
   - ⚠️ `app/pages/product-detail/` - **Used** in routes.jsx (line 23, 39-40)
     - Remove only if removing route AND using base product detail
   - ⚠️ `app/pages/registration/` - **Used** in routes.jsx (line 26, 51-53)
     - Remove only if removing route AND using base registration
   - ⚠️ `app/pages/newsletter-form/` - Check if used elsewhere
   - ⚠️ `app/pages/account/profile.jsx` - Check if used elsewhere
   - ⚠️ `app/pages/checkout/partials/contact-info.jsx` - **Used** by checkout (if using custom checkout)

### Review Before Removing

1. **SSR.js** - Review CORS config:
   - If pure headless (no SFRA integration): Can remove CORS allowedOrigins (lines 351-390)
   - Keep security headers, SLAS, Marketing Cloud if using
   - **Action**: Review if CORS is needed for your setup

2. **Custom Hooks (Currently Used):**
   - ⚠️ `use-auth-modal.js` - **USED** in 3 places - Keep if using custom auth
   - ⚠️ `use-custom-api.js` - **USED** in newsletter form - Keep if using custom API

3. **Routes:**
   - ✅ **MUST KEEP**: `/page/:pageId` route (required for Page Designer)
   - ⚠️ Review other routes - remove if not needed:
     - `/` → Home (custom)
     - `/my-new-route` → Example (can remove)
     - `/product/:productId` → ProductDetail (custom)
     - `/style-guide` → StyleGuide (can remove)
     - `/registration` → Registration (custom)

### Keep (Even If Custom)

- Any customizations that enhance multi-site functionality
- Any customizations that enhance Page Designer functionality
- Site-specific customizations

---

## 🔍 VERIFICATION CHECKLIST

Before removing files, verify:

- [ ] No imports reference the file elsewhere
- [ ] File is not used in routes
- [ ] File is not referenced in `_app/index.jsx` or `_app-config/index.jsx`
- [ ] File is not part of the theme system
- [ ] File is not part of the Page Designer system

---

## 📝 SUMMARY

**Minimum Required Files:**
- `app/theme/` - Complete theme system
- `app/components/_app-config/index.jsx` - Theme integration
- `app/pages/experience/` - Complete Page Designer system
- `app/pages/page/[pageId]/index.jsx` - Page Designer route
- `app/routes.jsx` - Must include `/page/:pageId` route

**Everything else is customization and can be removed if not needed.**

